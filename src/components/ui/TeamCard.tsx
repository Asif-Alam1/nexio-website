"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";

interface TeamCardProps {
  name: string;
  role: string;
  bio: string;
  initial: string;
  image?: string;
  linkedinUrl?: string;
}

export default function TeamCard({ name, role, bio, initial, image, linkedinUrl }: TeamCardProps) {
  return (
    <motion.div
      className={cn(
        "bg-white rounded-panel border border-border shadow-sm",
        "p-xl text-center",
        "transition-all duration-hover",
        "hover:shadow-md"
      )}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Photo */}
      <div className="flex justify-center mb-l">
        {image ? (
          <Image
            src={image}
            alt={name}
            width={120}
            height={120}
            className="rounded-full ring-2 ring-border object-cover object-top w-[120px] h-[120px]"
            priority={false}
          />
        ) : (
          <div className="bg-midnight rounded-full ring-2 ring-border flex items-center justify-center w-[120px] h-[120px]">
            <span className="font-display text-h1 text-white font-bold">{initial}</span>
          </div>
        )}
      </div>

      {/* Name */}
      <h3 className="font-display text-h3 text-midnight font-semibold mb-xs">{name}</h3>

      {/* Role */}
      <p className="text-sm text-blue-dark font-body mb-m">{role}</p>

      {/* Bio */}
      <p className="text-body text-slate mb-l">{bio}</p>

      {/* LinkedIn */}
      {linkedinUrl && (
        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center text-slate hover:text-blue transition-colors duration-hover"
          aria-label={`${name} on LinkedIn`}
        >
          <Linkedin size={18} />
        </a>
      )}
    </motion.div>
  );
}
