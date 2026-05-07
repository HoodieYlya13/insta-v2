import ModalDismissOverlay from "@/app/components/ModalDismissOverlay";
import { getPostById, getCurrentUser } from "@/app/lib/data";
import { Post } from "@/app/components/Post";
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

      <Post.Root 
        post={post} 
        currentUser={currentUser} 
        className="modal-content max-w-2xl! p-0 overflow-hidden flex flex-col md:flex-row h-[500px] relative z-10"
      >
        <Post.Media 
          priority 
          className="flex-1 bg-black flex items-center justify-center text-8xl relative overflow-hidden"
          sizes="(max-width: 768px) 100vw, 500px"
        />
        
        <div className="w-full md:w-80 pt-6 md:p-6 flex flex-col justify-between bg-card">
          <div>
            <Post.Header className="flex items-center gap-2 mb-4" />
            <Post.Title className="font-bold mb-2" />
            <Post.Description>
              This is the modal view (intercepted). The URL has changed to
              /post/{id} but we are still on the home page !
            </Post.Description>
          </div>

          <div className="flex flex-col gap-3 border-t border-border mt-2">
            <div className="flex gap-2 mt-2">
              <Post.LikeButton />
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
      </Post.Root>
    </div>
  );
}
