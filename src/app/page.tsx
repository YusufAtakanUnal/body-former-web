import Header from "@/components/Header";
import Hero from "@/components/Hero";
import {
  Problem,
  How,
  Twin,
  Compete,
  Coin,
  Privacy,
  Gyms,
  Waitlist,
  Faq,
} from "@/components/Sections";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Problem />
        <How />
        <Twin />
        <Compete />
        <Coin />
        <Privacy />
        <Gyms />
        <Waitlist />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
