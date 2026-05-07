"use client";

import { useRouter } from "next/navigation";
import { loginAction } from "@/app/actions";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn btn-primary w-full py-3"
    >
      {pending ? (
        <span className="flex items-center gap-2">
          <span className="animate-spin">
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
              className="animate-spin"
            >
              <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
            </svg>
          </span>{" "}
          Logging in...
        </span>
      ) : (
        "Login"
      )}
    </button>
  );
}

export default function LoginForm({ isModal = false }: { isModal?: boolean }) {
  const router = useRouter();

  const handleAuth = async () => {
    const result = await loginAction();

    if (result?.error) {
      toast.error(result.error);
      return;
    }

    if (isModal) router.back();
    else router.push("/");

    router.refresh();
  };

  return (
    <div className={isModal ? "" : "card p-8 max-w-md mx-auto mt-20"}>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-linear-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          InstaV2
        </h2>
        <p className="text-muted-foreground mt-2">Login to see photos</p>
      </div>

      <form action={handleAuth} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            placeholder="user@example.com"
            className="w-full p-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary outline-none transition-all"
            defaultValue="HY13dev@insta.v2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full p-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary outline-none transition-all"
            defaultValue="password"
          />
        </div>
        <SubmitButton />
      </form>

      <div className="mt-6 text-center text-sm text-muted-foreground">
        Don&apos;t have an account ?{" "}
        <span className="text-primary font-medium cursor-pointer">Sign up</span>
      </div>
    </div>
  );
}
