import Navbar from "../Components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#ccff00] text-white">
      <Navbar />

      <section className="flex min-h-[70vh] items-center justify-center">
        <h1 className="text-4xl font-black">
          FIT <span className="text-[#ccff00]">LOG</span>
        </h1>
      </section>
    </main>
  );
}