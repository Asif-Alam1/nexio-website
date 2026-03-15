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
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
        <SectionHeader
          label="THE TEAM"
          title="The People Behind Nexio."
          subtitle="A small team that gives every project our full attention."
        />

        {/* Cards */}
        <div className="flex justify-center">
          <motion.div
            className="flex flex-col md:flex-row gap-12 w-full max-w-[800px]"
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
