"use client";

import { Auth } from "@/app/components/Auth";
import ModalDismissOverlay from "@/app/components/ModalDismissOverlay";
import { useRouter } from "next/navigation";

export default function LoginInterceptedModal() {
  const router = useRouter();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <ModalDismissOverlay />
      <div className="modal-content relative z-10">
        <Auth.Root
          onSuccess={() => {
            router.back();
            router.refresh();
          }}
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
    </div>
  );
}
