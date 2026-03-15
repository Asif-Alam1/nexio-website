import Navbar from "@/components/layout/Navbar";
import ScrollProgress from "@/components/layout/ScrollProgress";
import CustomCursor from "@/components/layout/CustomCursor";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <section id="process" className="min-h-screen bg-midnight flex items-center justify-center">
          <h2 className="font-display text-h1 text-white">Process</h2>
        </section>
        <section id="team" className="min-h-screen bg-cloud flex items-center justify-center">
          <h2 className="font-display text-h1 text-midnight">Team</h2>
        </section>
        <section id="contact" className="min-h-screen bg-midnight flex items-center justify-center">
          <h2 className="font-display text-h1 text-white">Contact</h2>
        </section>
      </main>
      <FloatingWhatsApp />
    </>
  );
}
