"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import TeamCard from "@/components/ui/TeamCard";

const team = [
  {
    name: "Asif Alam",
    role: "Co-Founder & Lead Engineer",
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
  {
    name: "Karl Abou Jaoude",
    role: "E-Commerce Expert",
    bio: "Turns online stores into revenue machines. Knows payments, inventory, and conversion inside out.",
    initial: "K",
      image: "/images/team/karl.jpeg",
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
    <section id="team" aria-label="Meet our team" className="bg-white py-4xl border-t border-border/50">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
        <SectionHeader
          metadata="THE TEAM"
          title="The People Behind Nexio."
          subtitle="A small team that gives every project our full attention."
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
        >
          {team.map((member) => (
            <div key={member.name} className="h-full">
              <TeamCard {...member} />
            </div>
          ))}
        </motion.div>
      </div>

    </section>
  );
}
