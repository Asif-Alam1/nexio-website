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
        "group bg-white rounded-panel border border-border shadow-sm",
        "p-8 text-center h-full",
        "transition-all duration-300",
        "hover:shadow-lg hover:border-blue/20 hover:-translate-y-1"
      )}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Photo — zoom on card hover */}
      <div className="flex justify-center mb-6">
        <div className="overflow-hidden rounded-full ring-2 ring-border group-hover:ring-blue/30 transition-all duration-300">
          {image ? (
            <Image
              src={image}
              alt=""
              width={120}
              height={120}
              sizes="120px"
              className="object-cover object-top w-[120px] h-[120px] transition-transform duration-500 group-hover:scale-110"
              priority={false}
            />
          ) : (
            <div className="bg-midnight flex items-center justify-center w-[120px] h-[120px]">
              <span className="font-display text-h1 text-white font-bold">{initial}</span>
            </div>
          )}
        </div>
      </div>

      {/* Name */}
      <h3 className="font-display text-h3 text-midnight font-semibold mb-1">{name}</h3>

      {/* Role — styled as a small badge */}
      <p className="inline-block text-[13px] text-blue font-medium font-body mb-4 bg-blue-tint px-3 py-0.5 rounded-full">
        {role}
      </p>

      {/* Bio */}
      <p className="text-body text-slate leading-relaxed">{bio}</p>

      {/* LinkedIn */}
      {linkedinUrl && (
        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center text-slate hover:text-blue transition-colors duration-hover p-2 mt-4"
          aria-label={`${name} on LinkedIn`}
        >
          <Linkedin size={18} />
        </a>
      )}
    </motion.div>
  );
}
