import Navbar from "../Components/Navbar";
import Hero from "../Components/Hero";
export default function Home() {
  return (
    <main className="min-h-screen bg-[#14161b] text-white">
      <Navbar />
      <Hero />
      <section 
       id="library"
        className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8"
      >
        <h2 className="text-2xl font-black uppercase tracking-[-0.04em]">
          THE LIBRARY
        </h2>

        <p className="mt-1 text-[10px] text-white/40">
          Twelve lifts covering every major muscle group.
        </p>
      </section>
    </main>
  );
}