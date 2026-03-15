import Button from "@/components/ui/Button";
import SectionHeader from "@/components/ui/SectionHeader";

export default function Home() {
  return (
    <main className="min-h-screen">
      <section className="bg-midnight py-4xl noise-overlay">
        <div className="relative z-10 max-w-5xl mx-auto px-m">
          <SectionHeader
            label="Tech Agency · Lebanon & MENA"
            title="Connect Your Business Online."
            subtitle="We build websites, e-commerce platforms, AI chatbots, and automations for Lebanese businesses ready to grow."
            dark
          />
          <div className="flex gap-m justify-center">
            <Button variant="primary" href="#">Book a Call</Button>
            <Button variant="secondary">Our Services</Button>
          </div>
        </div>
      </section>
      <section className="bg-cloud py-4xl">
        <div className="max-w-5xl mx-auto px-m">
          <SectionHeader
            label="Our Services"
            title="What We Build"
            subtitle="Everything your business needs online, built with care and precision."
          />
        </div>
      </section>
    </main>
  );
}
