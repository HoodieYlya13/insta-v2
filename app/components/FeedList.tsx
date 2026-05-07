import OptimisticPostItem from "./OptimisticPostItem";
import { getPosts, getCurrentUser } from "../lib/data";
import { toggleLikeAction } from "../actions";

export default async function FeedList({ sort }: { sort: string }) {
  // Simulate network delay for PPR demonstration
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const posts = await getPosts(sort);
  const currentUser = await getCurrentUser();

  return (
    <div className="grid grid-cols-1 max-w-xl mx-auto gap-8">
      {posts.map((post, index) => (
        <OptimisticPostItem
          key={post.id}
          post={post}
          currentUser={currentUser}
          toggleLikeAction={toggleLikeAction}
          priority={index === 0}
        />
      ))}
    </div>
  );
}
