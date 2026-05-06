"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction() {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const cookieStore = await cookies();
  cookieStore.set("access_token", "access_token", { httpOnly: true });
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("access_token");
  redirect("/");
}

export async function deletePostAction(postId: string) {
  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulate a server error for optimistic UI rollback demo
  console.log(`Attempting to delete post ${postId}... but failing.`);
  throw new Error("Oups ! Server has crashed, deletion impossible.");
}
