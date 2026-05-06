import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import OptimisticPostItem, { Post } from "./OptimisticPostItem";

// Simulated persistence (postId liked by current user)
const USER_LIKES = new Set<string>();

const DUMMY_POSTS: Post[] = Array.from({ length: 10 }).map((_, i) => ({
  id: i.toString(),
  title: `✨ Magic moment #${i + 1} ! An unforgettable day spent exploring the wonders of technology. #InstaV2 #React19`,
  likes: 12 + i * 2, // Stable base likes
  authorId: `User${i % 3}`,
  isLiked: false,
}));

export default async function FeedList({ sort }: { sort: string }) {
  // Simulate network delay for PPR demonstration
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const cookieStore = await cookies();
  const hasAccessToken = cookieStore.has("access_token");

  const currentUser = hasAccessToken ? "User0" : null;

  const postsWithState = DUMMY_POSTS.map((post) => {
    const isLiked = USER_LIKES.has(post.id);
    return {
      ...post,
      likes: post.likes + (isLiked ? 1 : 0),
      isLiked,
    };
  });

  const posts =
    sort === "desc" ? [...postsWithState].reverse() : postsWithState;

  const toggleLikeOnServer = async (postId: string) => {
    "use server";
    // Simulate server processing
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (USER_LIKES.has(postId)) {
      USER_LIKES.delete(postId);
      console.log(`The post ${postId} has been UNLIKED in the database.`);
    } else {
      USER_LIKES.add(postId);
      console.log(`The post ${postId} has been LIKED in the database.`);
    }

    revalidatePath("/");
  };

  return (
    <div className="grid grid-cols-1 max-w-xl mx-auto gap-8">
      {posts.map((post) => (
        <OptimisticPostItem
          key={post.id}
          post={post}
          currentUser={currentUser}
          toggleLikeAction={toggleLikeOnServer}
        />
      ))}
    </div>
  );
}
