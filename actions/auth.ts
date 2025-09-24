//actions/auth.ts
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import axiosInstance from "@/lib/axios";

export async function signin(formData: FormData) {
  const supabase = await createClient();

  const credentials = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error, data } = await supabase.auth.signInWithPassword(credentials);

  if (error) {
    return {
      status: "error",
      message: error.message,
      user: null,
    };
  }

  const { data: existingUser } = await supabase
    .from("user_profile")
    .select("*")
    .eq("email", credentials.email)
    .limit(1)
    .single();

  if (!existingUser) {
    const { error: insertError } = await supabase.from("user_profile").insert({
      email: data?.user?.email,
      username: data?.user?.user_metadata?.username,
    });
    if (insertError) {
      return {
        message: insertError.message,
        data: null,
      };
    }
  }

  revalidatePath("/", "layout");
  redirect("/");

  return { status: "success", user: data.user };
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const credentials = {
    username: formData.get("username") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { data: authData, error: signUpError } = await supabase.auth.signUp({
    email: credentials.email,
    password: credentials.password,
    options: {
      data: {
        username: credentials.username,
      },
    },
  });

  if (signUpError) {
    return {
      status: "error",
      message: signUpError.message,
      user: null,
    };
  }

  const user = authData.user;

  if (!user) {
    return {
      status: "error",
      message: "User creation failed for unknown reasons",
      user: null,
    };
  }

  // Insert user into 'users' table
  const { error: dbError } = await supabase
    .from("users")
    .insert([
      { id: user.id, username: credentials.username, email: credentials.email },
    ]);

  if (dbError) {
    return {
      status: "error",
      message: "Failed to save user info: " + dbError.message,
      user: null,
    };
  }

  return {
    status: "success",
    user,
  };
}

export async function signOut() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/signin");
}

export async function signInWithGitHub() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${process.env.NEXT_URL}/auth/callback`,
    },
  });

  if (error || !data?.url) {
    return { error: true };
  }

  //  Do NOT call `redirect()` here
  return { url: data.url };
}

export async function signInWithGoogle() {
  const supabase = await createClient();
  const origin = await axiosInstance.get("origin");

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_URL}/auth/callback`,
    },
  });
  if (error || !data?.url) {
    return { error: true };
  }

  //  Do NOT call `redirect()` here
  return { url: data.url };
}

export async function forgotPassword(formData: FormData) {
  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(
    formData.get("email") as string,
    { redirectTo: `${process.env.NEXT_URL}/reset-password` }
  );

  if (error) {
    return {
      message: error.message,
    };
  }

  return { status: "success" };
}

export async function resetPassword(formData: FormData, code: string) {
  const supabase = await createClient();

  const { error: codeError } = await supabase.auth.exchangeCodeForSession(code);

  if (codeError) {
    return {
      status: codeError.message,
    };
  }

  const { error } = await supabase.auth.updateUser({
    password: formData.get("password") as string,
  });

  if (error) {
    return {
      status: error.message,
    };
  }

  return { status: "success" };
}
