import Navbar from "../Components/Navbar";
import Hero from "../Components/Hero";
import WorkoutLibrary from "../Components/WorkoutLibrary";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#14161b] text-white">
      <Navbar />
      <Hero />
      <WorkoutLibrary />
    </main>
  );
}