"use client";

import { useRouter } from "next/navigation";

export default function ModalDismissOverlay() {
  const router = useRouter();

  return (
    <div
      className="absolute inset-0 bg-black/40 backdrop-blur-sm cursor-default"
      onClick={() => router.back()}
    />
  );
}
