"use client";

import { useEffect } from "react";

export default function ConsoleEasterEgg() {
  useEffect(() => {
    console.log(
      '%c NEXIO LABS %c Curating the Future of Code %c\n\nLike what you see? Let\'s talk → hello@nexiolabs.co',
      'background: #F97316; color: #080D1A; font-size: 16px; font-weight: bold; padding: 8px 12px;',
      'background: #0B1120; color: #E2E8F0; font-size: 14px; padding: 8px 12px;',
      ''
    );
  }, []);

  return null;
}
