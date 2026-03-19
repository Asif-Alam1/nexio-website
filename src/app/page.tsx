import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import ClientShell from "@/components/layout/ClientShell";

const Services = dynamic(() => import("@/components/sections/Services"));
const Process = dynamic(() => import("@/components/sections/Process"));
const Team = dynamic(() => import("@/components/sections/Team"));
const Contact = dynamic(() => import("@/components/sections/Contact"));
const Footer = dynamic(() => import("@/components/layout/Footer"));

export default function Home() {
  return (
    <>
      <ClientShell />
      <Navbar />
      <main id="main-content">
        <Hero />
        <Services />
        <Process />
        <Team />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
