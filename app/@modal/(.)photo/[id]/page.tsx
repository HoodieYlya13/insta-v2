import ModalDismissOverlay from '@/app/components/ModalDismissOverlay';
import { getPostById, getCurrentUser } from '@/app/lib/data';
import Image from 'next/image';
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
