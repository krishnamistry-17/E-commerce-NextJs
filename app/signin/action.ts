//app/pages/signin/action.ts
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { data: authData } = await supabase.auth.signUp({
    email,
    password,
  });

  const user = authData.user;

  if (user) {
    const { error: dbError } = await supabase.from("users").insert([
      {
        id: user.id, // Use Supabase auth UID as primary key
        email,
        name: name,
      },
    ]);

    if (dbError) {
      console.error("Error inserting into users table:", dbError);
    }
  }

  redirect("/signin");
}
