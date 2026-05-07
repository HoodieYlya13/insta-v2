import { cookies } from "next/headers";
import { Post } from "../components/Post/PostContext";

// Simulated persistence (postId liked by current user)
const USER_LIKES = new Set<string>();

const DUMMY_POSTS: Post[] = [
  {
    id: "0",
    title: "✨ Exploring the future of technology in a state-of-the-art lab. The blue interfaces are just magical! #Tech #Innovation",
    likes: 124,
    authorId: "HY13dev",
    isLiked: false,
    imageUrl: "/posts/tech.png",
  },
  {
    id: "1",
    title: "🌿 Minimalist mornings. There's something so peaceful about a clean workspace and natural light. #Workspace #Design",
    likes: 89,
    authorId: "User0",
    isLiked: false,
    imageUrl: "/posts/minimalist.png",
  },
  {
    id: "2",
    title: "⛰️ Caught this breathtaking sunset over the mountains today. Nature never ceases to amaze me. #Nature #Photography",
    likes: 245,
    authorId: "User1",
    isLiked: false,
    imageUrl: "/posts/nature.png",
  },
  {
    id: "3",
    title: "⚡ Coding session in the zone. React 19 and Next.js 16 are absolute game changers for DX. #Coding #React",
    likes: 56,
    authorId: "User2",
    isLiked: false,
    imageUrl: "/posts/coding.png",
  },
  {
    id: "4",
    title: "🍵 Sunday vibes. Taking a moment to appreciate the small things in life. #Sunday #Minimalist",
    likes: 112,
    authorId: "HY13dev",
    isLiked: false,
    imageUrl: "/posts/lifestyle.png",
  },
];

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
  return hasAccessToken ? "HY13dev" : null;
}

export async function toggleLike(postId: string) {
  // Simulate server processing
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (USER_LIKES.has(postId)) USER_LIKES.delete(postId);
  else USER_LIKES.add(postId);
}
