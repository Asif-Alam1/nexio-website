import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";

const Services = dynamic(() => import("@/components/sections/Services"));
const Process = dynamic(() => import("@/components/sections/Process"));
const Team = dynamic(() => import("@/components/sections/Team"));
const Contact = dynamic(() => import("@/components/sections/Contact"));

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Process />
      <Team />
      <Contact />
    </>
  );
}
