"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ModalDismissOverlay() {
  const router = useRouter();

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  return (
    <div
      className="absolute inset-0 bg-black/40 backdrop-blur-sm cursor-default"
      onClick={() => router.back()}
    />
  );
}
