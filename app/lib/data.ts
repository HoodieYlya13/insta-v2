import { cookies } from "next/headers";
import { Post } from "../components/OptimisticPostItem";

// Simulated persistence (postId liked by current user)
const USER_LIKES = new Set<string>();

const DUMMY_POSTS: Post[] = Array.from({ length: 10 }).map((_, i) => ({
  id: i.toString(),
  title: `✨ Magic moment #${i + 1} ! An unforgettable day spent exploring the wonders of technology. #InstaV2 #React19`,
  likes: 12 + i * 2,
  authorId: `User${i % 3}`,
  isLiked: false,
}));

export async function getPosts(sort: string = "desc") {
  const currentUser = await getCurrentUser();
  const isLiked = (id: string) => !!currentUser && USER_LIKES.has(id);

  const postsWithState = DUMMY_POSTS.map((post) => ({
    ...post,
    likes: post.likes + (USER_LIKES.has(post.id) ? 1 : 0),
    isLiked: isLiked(post.id),
  }));

  return sort === "desc" ? [...postsWithState].reverse() : postsWithState;
}

export async function getPostById(id: string) {
  const post = DUMMY_POSTS.find((p) => p.id === id);
  if (!post) return null;

  const currentUser = await getCurrentUser();
  const isLiked = !!currentUser && USER_LIKES.has(id);
  
  return {
    ...post,
    likes: post.likes + (USER_LIKES.has(id) ? 1 : 0),
    isLiked,
  };
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const hasAccessToken = cookieStore.has("access_token");
  return hasAccessToken ? "User0" : null;
}

export async function toggleLike(postId: string) {
  // Simulate server processing
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (USER_LIKES.has(postId)) USER_LIKES.delete(postId);
  else USER_LIKES.add(postId);
}
