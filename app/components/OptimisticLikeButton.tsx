'use client';

import { useOptimistic, useTransition, useSyncExternalStore } from 'react';
import { useRouter } from 'next/navigation';
import { authStore } from './OptimisticPostItem';

export default function OptimisticLikeButton({ 
  post, 
  isConnected, 
  toggleLikeAction 
}: { 
  post: { id: string, likes: number, isLiked: boolean }, 
  isConnected: boolean, 
  toggleLikeAction: (id: string) => Promise<{ success?: boolean; error?: string }> 
}) {
  const router = useRouter();
  const loggingOut = useSyncExternalStore(authStore.subscribe, authStore.getSnapshot, () => false);
  const [, startTransition] = useTransition();

  const isConnectedEffective = isConnected && !loggingOut;

  const [optimisticState, toggleOptimisticLike] = useOptimistic(
    { likes: post.likes, isLiked: post.isLiked && !loggingOut },
    (state) => ({
      likes: state.isLiked ? state.likes - 1 : state.likes + 1,
      isLiked: !state.isLiked
    })
  );

  const handleLike = () => {
    if (!isConnectedEffective) {
      router.push('/login');
      return;
    }

    startTransition(async () => {
      toggleOptimisticLike(null); 
      
      try {
        await toggleLikeAction(post.id); 
      } catch (error) {
        console.error("Like toggle failed", error);
      }
    });
  };

  return (
    <form action={handleLike}>
      <button 
        type="submit" 
        aria-label={optimisticState.isLiked ? `Unlike post. Current likes: ${optimisticState.likes}` : `Like post. Current likes: ${optimisticState.likes}`}
        className={`btn btn-ghost font-bold hover:scale-110 active:scale-95 transition-all flex items-center gap-2 ${
          optimisticState.isLiked ? 'text-red-500' : 'text-muted-foreground'
        }`}
      >
        <span className={optimisticState.isLiked ? 'scale-125' : ''}>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill={optimisticState.isLiked ? "currentColor" : "none"} 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
          </svg>
        </span>
        <span aria-live="polite">
          {optimisticState.likes} {optimisticState.likes === 1 ? 'Like' : 'Likes'}
        </span>
      </button>
    </form>
  );
}
