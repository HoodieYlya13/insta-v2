# InstaV2 - Next.js 16 & React 19 Best Practices Demo

This project is a high-level technical demonstration of **Next.js 16** and **React 19** capabilities. It implements modern patterns and "tricks" to achieve a premium, fluid, and ultra-optimized user experience.

> [!IMPORTANT]
> **Performance Note**: You may notice intentional delays (e.g., 1.5s) when loading the feed or refreshing. These are **simulated API latencies** specifically added to demonstrate **Suspense boundaries**, **PPR streaming**, and **React 19 Transitions**. The application is fundamentally high-performance; these delays allow you to actually see and test the loading states in a local environment.

## 🚀 Key Features & Best Practices

### 1. Partial Prerendering (PPR) & Cache Components
The app utilizes the new `cacheComponents: true` model from Next.js 16.
- **Static Shell**: Headers, titles, and navigation are pre-rendered as static HTML.
- **Dynamic Holes**: Real-time data like user authentication status and the photo feed are streamed into the shell using `Suspense` boundaries.

### 2. React 19 Optimistic UI
Leveraging the `useOptimistic` hook for instant feedback:
- **Likes**: Toggling likes updates the UI immediately. If the server fails, it automatically rolls back.
- **Deletions**: Deleting a post (simulated for `User0`) hides it instantly. If the simulated server action throws an error, the post reappears seamlessly.
- **Rapid Toggling**: The UI remains interactive even while server actions are pending, handling multiple queued updates correctly.

### 3. The "Instagram Trick" (Intercepting & Parallel Routes)
Sophisticated routing patterns using `@modal` and `(.)photo` markers.
- **Soft Navigation**: Clicking a photo in the feed opens it in a modal without a full page reload, while updating the URL.
- **Hard Navigation**: Refreshing the page or sharing the link loads a dedicated full-page view of the photo.

### 4. URL as State Management
Filters (Recent/Oldest) are driven by URL Search Parameters instead of local `useState`.
- **Shareable state**: You can share the exact filtered view via the URL.
- **Browser History**: Native back/forward buttons work out of the box for filter changes.

### 5. Progressive Enhancement with Server Actions
- **Logout Form**: Authentication actions are handled via native `<form>` elements and Server Actions. This ensures the app remains functional even if JavaScript fails to load or execution is delayed.
- **Action passing**: Server Actions are passed as props to Client Components, keeping business logic close to the server components that define them.

### 6. Concurrent Transitions vs. "The Key Trick"
- **Evolution of Refresh**: While we initially explored the common "Key Trick" (forcing a re-mount by changing a `key` prop) to trigger refreshes, we upgraded to **Concurrent Transitions** using `useTransition` and `router.refresh()`. 
- **Premium UX**: This approach provides a seamless "Instagram-style" update where the old UI remains interactive and visible while the server streams fresh data in the background, avoiding jarring flashes of loading skeletons.

## 🛠 Tech Stack
- **Framework**: Next.js 16.2.5 (App Router)
- **Library**: React 19.2.4
- **Optimization**: React Compiler enabled
- **Styling**: Tailwind CSS 4 + Modern CSS (Glassmorphism, Liquid Glass)
- **Deployment**: Optimized for Vercel with PPR support

## 🚦 Getting Started

First, install dependencies:
```bash
npm install
# or
bun install
```

Then, run the development server:
```bash
npm run dev
# or
bun dev
```

Build for production:
```bash
npm run build
```

---
*Created as a playground for Next.js 16 + React 19 advanced patterns.*
