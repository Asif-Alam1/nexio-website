"use client";

import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";

interface TeamCardProps {
  name: string;
  role: string;
  bio: string;
  initial: string;
  linkedinUrl?: string;
}

export default function TeamCard({ name, role, bio, initial, linkedinUrl }: TeamCardProps) {
  return (
    <motion.div
      className={cn(
        "glass-light",
        "bg-white/70 backdrop-blur-xl rounded-panel border border-white/50 shadow-lg",
        "p-xl text-center",
        "transition-all duration-hover",
        "hover:ring-1 hover:ring-blue/20"
      )}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Photo placeholder */}
      <div className="flex justify-center mb-l">
        <div className="bg-midnight rounded-full ring-2 ring-border flex items-center justify-center w-[120px] h-[120px]">
          <span className="font-display text-h1 text-white font-bold">{initial}</span>
        </div>
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
