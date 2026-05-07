"use client";

import { Auth } from "@/app/components/Auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <Auth.Root
        onSuccess={() => {
          router.push("/");
          router.refresh();
        }}
        className="card p-8 max-w-md mx-auto w-full"
      >
        <Auth.Header />
        <Auth.Form>
          <Auth.Input
            label="Email"
            type="email"
            placeholder="user@example.com"
            defaultValue="HY13dev@insta.v2"
          />
          <Auth.Input
            label="Password"
            type="password"
            placeholder="••••••••"
            defaultValue="password"
          />
          <Auth.Submit />
        </Auth.Form>
        <Auth.Footer>
          Don&apos;t have an account ?{" "}
          <span className="text-primary font-medium cursor-pointer">
            Sign up
          </span>
        </Auth.Footer>
      </Auth.Root>
    </div>
  );
}
