"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"

export async function login(formData: FormData) {
  const supabase = await createClient()
  const cookieStore = await cookies()

  const token = formData.get("token") as string

  if (token) {
    const { data } = await supabase
      .from("codes")
      .select()
      .eq("key", token)
      .limit(1)

    if (
      data != null &&
      data.length == 1 &&
      new Date(data[0].expired_at) > new Date()
    ) {
      cookieStore.set("token", data[0].key)

      revalidatePath("/", "layout")
      redirect("/")
    } else {
      redirect("/login?error=Invalid token")
    }
  } else {
    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    }

    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) {
      redirect("/error")
    }

    revalidatePath("/", "layout")
    redirect("/")
  }
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect("/error")
  }

  revalidatePath("/", "layout")
  redirect("/")
}
