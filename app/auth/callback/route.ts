//app/auth/callback/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  let next = searchParams.get("next") ?? "/";

  if (!next.startsWith("/")) {
    next = "/";
  }

  console.log(" OAuth callback hit. Code:", code);

  if (!code) {
    console.error(" No code provided");
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }

  const supabase = await createClient();

  const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(
    code
  );

  if (exchangeError) {
    console.error(" exchangeCodeForSession failed:", exchangeError.message);
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }

  console.log(" Session exchange successful");

  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError) {
    console.error(" getUser failed:", userError.message);
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }

  const user = userData?.user;
  if (!user) {
    console.error(" No user returned from getUser");
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }

  console.log(" Authenticated user:", user.email);

  // Check if user already exists in user_profile
  const { data: existingUser, error: fetchError } = await supabase
    .from("user_profile")
    .select("*")
    .eq("email", user.email)
    .limit(1)
    .single();

  if (fetchError && fetchError.code !== "PGRST116") {
    console.error(" Error checking user existence:", fetchError.message);
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }

  if (!existingUser) {
    const { error: insertError } = await supabase.from("user_profile").insert({
      email: user.email,
      username: user.user_metadata?.username ?? "unknown",
    });

    if (insertError) {
      console.error(" Failed to insert user_profile:", insertError.message);
      return NextResponse.redirect(`${origin}/auth/auth-code-error`);
    }

    console.log(" User inserted into user_profile");
  } else {
    console.log(" User already exists in user_profile");
  }

  const forwardedHost = request.headers.get("x-forwarded-host");
  const isLocalEnv = process.env.NODE_ENV === "development";

  const finalRedirect = isLocalEnv
    ? `${origin}${next}`
    : forwardedHost
    ? `https://${forwardedHost}${next}`
    : `${origin}${next}`;

  console.log(" Redirecting to:", finalRedirect);
  return NextResponse.redirect(finalRedirect);
}
