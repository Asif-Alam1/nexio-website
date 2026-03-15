"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import TeamCard from "@/components/ui/TeamCard";

const team = [
  {
    name: "Asif Alam",
    role: "Co-Founder & Lead Developer",
    bio: "Writes the code, architects the systems, and makes sure every pixel works. Believes great technology should feel invisible.",
    initial: "A",
    image: "/images/team/asif.jpeg",
  },
  {
    name: "Joseph Attieh",
    role: "Co-Founder & Business Development",
    bio: "Finds the right clients, shapes the right projects, and makes sure every partnership creates real value.",
    initial: "J",
    image: "/images/team/joseph.jpeg",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export default function Team() {
  return (
    <section id="team" className="bg-cloud py-4xl">
      <div className="max-w-7xl mx-auto px-m lg:px-2xl">
        <SectionHeader
          label="THE TEAM"
          title="The People Behind Nexio."
          subtitle="A small team that gives every project our full attention."
        />

        {/* Cards with background blob */}
        <div className="relative flex justify-center">
          {/* Faint blue gradient blob behind cards */}
          <div
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
            aria-hidden="true"
          >
            <div className="bg-blue-tint rounded-full blur-3xl opacity-30 w-[600px] h-[400px]" />
          </div>

          <motion.div
            className="relative z-10 flex flex-col md:flex-row gap-12 w-full max-w-[800px]"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
          >
            {team.map((member) => (
              <div key={member.name} className="flex-1">
                <TeamCard {...member} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
