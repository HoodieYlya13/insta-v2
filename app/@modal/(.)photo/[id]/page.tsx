import ModalDismissOverlay from '@/app/components/ModalDismissOverlay';
import { getPostById, getCurrentUser } from '@/app/lib/data';
import { toggleLikeAction } from '@/app/actions';
import OptimisticLikeButton from '@/app/components/OptimisticLikeButton';
import { notFound } from 'next/navigation';

export default async function PhotoInterceptedModal({
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
        <div className="flex-1 bg-black flex items-center justify-center text-8xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-muted-foreground/50"
          >
            <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
            <circle cx="12" cy="13" r="3"></circle>
          </svg>
        </div>
        <div className="w-full md:w-80 p-6 flex flex-col justify-between bg-card">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-primary" />
              <span className="font-bold text-sm">{post.authorId}</span>
            </div>
            <h3 className="font-bold mb-2">{post.title}</h3>
            <p className="text-sm text-muted-foreground">
              This is the modal view (intercepted). The URL has changed to
              /photo/{id} but we are still on the home page !
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <OptimisticLikeButton 
              post={post} 
              isConnected={!!currentUser} 
              toggleLikeAction={toggleLikeAction} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
