import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Journey from "@/components/Journey";
import { Gyms, Waitlist, Faq } from "@/components/Sections";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Journey />
        <Faq />
        <Waitlist />
        <Gyms />
      </main>
      <Footer />
    </>
  );
}
