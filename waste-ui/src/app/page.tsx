import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Scanner from "@/components/Scanner";
import Dashboard from "@/components/Dashboard";
import HowItWorks from "@/components/HowItWorks";
import Categories from "@/components/Categories";
import Roadmap from "@/components/Roadmap";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-grow">
        <Hero />
        <Scanner />
        <Dashboard />
        <HowItWorks />
        <Categories />
        <Roadmap />
      </main>
      <Footer />
    </div>
  );
}
