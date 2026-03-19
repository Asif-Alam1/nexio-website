"use client";

import dynamic from "next/dynamic";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

const ScrollProgress = dynamic(
  () => import("@/components/layout/ScrollProgress"),
  { ssr: false }
);
const CustomCursor = dynamic(
  () => import("@/components/layout/CustomCursor"),
  { ssr: false }
);
const FloatingWhatsApp = dynamic(
  () => import("@/components/layout/FloatingWhatsApp"),
  { ssr: false }
);

export default function ClientShell() {
  useSmoothScroll();

  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <FloatingWhatsApp />
    </>
  );
}
