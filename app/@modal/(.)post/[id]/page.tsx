import ModalDismissOverlay from "@/app/components/ModalDismissOverlay";
import { getPostById, getCurrentUser } from "@/app/lib/data";
import Image from "next/image";
import { toggleLikeAction } from "@/app/actions";
import OptimisticLikeButton from "@/app/components/OptimisticLikeButton";
import { notFound } from "next/navigation";

export default async function PostInterceptedModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPostById(id);
  const currentUser = await getCurrentUser();

  if (!post) notFound();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <ModalDismissOverlay />

      <div className="modal-content max-w-2xl! p-0 overflow-hidden flex flex-col md:flex-row h-[500px] relative z-10">
        <div className="flex-1 bg-black flex items-center justify-center text-8xl relative overflow-hidden">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 500px"
            priority
          />
        </div>
        <div className="w-full md:w-80 pt-6 md:p-6 flex flex-col justify-between bg-card">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="size-10 rounded-full bg-linear-to-tr from-yellow-400 via-red-500 to-purple-600 p-[2px]">
                <div className="size-full rounded-full bg-primary flex items-center justify-center font-bold text-xs">
                  {post.authorId.slice(0, 2)}
                </div>
              </div>
              <span className="font-bold text-sm">{post.authorId}</span>
            </div>
            <h3 className="font-bold mb-2">{post.title}</h3>
            <p className="text-sm text-muted-foreground">
              This is the modal view (intercepted). The URL has changed to
              /post/{id} but we are still on the home page !
            </p>
          </div>

          <div className="flex flex-col gap-3 border-t border-border mt-2">
            <div className="flex gap-2 mt-2">
              <OptimisticLikeButton
                post={post}
                isConnected={!!currentUser}
                toggleLikeAction={toggleLikeAction}
              />
              <button
                className="btn btn-ghost border border-border flex items-center justify-center gap-2 text-sm h-10 ml-auto"
                aria-label="Comment on this post"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                Comment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
