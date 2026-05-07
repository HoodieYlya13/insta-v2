"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { toggleLike } from "./lib/data";
import { revalidatePath } from "next/cache";

export async function loginAction() {
  try {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const cookieStore = await cookies();
    cookieStore.set("access_token", "access_token", { httpOnly: true });
    return { success: true };
  } catch {
    return { error: "Login failed. Please check your credentials." };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("access_token");
  revalidatePath("/", "layout");
  redirect("/");
}

export async function deletePostAction(postId: string) {
  try {
    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulate a server error for optimistic UI rollback demo
    console.log(`Attempting to delete post ${postId}... but failing.`);
    return { error: "Oups ! Server has crashed, deletion impossible." };
  } catch {
    return { error: "An unexpected error occurred during deletion." };
  }
}

export async function toggleLikeAction(postId: string) {
  try {
    await toggleLike(postId);
    revalidatePath("/");
    return { success: true };
  } catch {
    return { error: "Failed to update like status." };
  }
}
