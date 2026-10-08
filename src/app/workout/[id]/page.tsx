import Link from "next/link";
import WorkoutActions from "../../../Components/WorkoutActions";
import { ArrowLeft, Clock, Flame, Star } from "lucide-react";

interface Workout {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
}

interface WorkoutPageProps {
  params: Promise<{ id: string }>;
}

const API_URL = "https://api.api-store.workers.dev/api/fitlog";

async function getWorkout(id: string): Promise<Workout> {
  const response = await fetch(`${API_URL}/${id}`, {
    cache: "no-store",
  })
  if (!response.ok) {
    throw new Error("Workout not found");
  }
  return response.json();
}

export default async function WorkoutPage({
  params,
}: WorkoutPageProps) {
  const { id } = await params;
  const workout = await getWorkout(id);

  return (
    <main className="min-h-screen bg-[#0b0c0d] text-white">
      <header className="border-b border-white/10 bg-[#0b0c0d]">
        <nav className="mx-auto flex min-h-20 max-w-7xl items0center justify-between px-5 lg:px-8">

          <Link href="/"
            className="text-xl font-black tracking-tight">
            FIT<span className="text-[#ccff00]">LOG</span>
          </Link>

          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-bold uppercase text-white/60 hover:text-white">
            <ArrowLeft size={16} />
            Back
          </Link>
        </nav>
      </header>

      <section className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">

          <div className="overflow-hidden rounded-xl border border-white/10 bg-[#14161b]">
            <img
              src={workout.image}
              alt={workout.name}
              className="w-full h-full object-cover"
            />
          </div>
           <div className="flex flex-col justify-center">

            <div className="flex flex-wrap gap-2">
              {workout.muscleGroups.map((group) => (
                <span
                  key={group}
                className="rounded-ful bg-[#ccff00] px-3 py-1 text-[10px] font-black uppercase text-black"
              >
                {group}
              </span>
            ))}
            </div>
            <h1 className="mt-5 text-4xl font-black uppercase leading-none tracking-tight sm:text-5xl">
              {workout.name}
            </h1>

            <p className="mt-4 text-sm text-white/40">
             Equipment:{" "}
             <span className="text-white/70">
               {workout.equipment}
             </span>
            </p>
            <p className="mt-6 max-w-xl text-sm leading-7 text-white/60">
              {workout.description}
            </p>

            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
              <div className="rounded-lg border border-white/10 bg-[#14161b] p-4">
              <Clock size={17} className="text-[#ccff00]" />
                <p className="mt-2 text-sm text-white/40">Duration</p>
                <p className="mt-1 font-bold">
                  {workout.duration} min
                </p>
              </div>

              <div className="rounded-lg border border-white/10 bg-[#14161b] p-4">
               <Flame size={17} className="text-[#ccff00]" />
                <p className="mt-2 text-sm text-white/40">Calories</p>
                <p className="mt-1 font-bold">
                  {workout.caloriesBurned} kcal
                </p>
              </div>

              <div className="rounded-lg border border-white/10 bg-[#14161b] p-4">
              <p className="text-lg font-black text-[#ccff00]">
                {workout.sets}
              </p>
              <p className="mt-2 text-sm text-white/40">Sets</p>
              </div>

              <div className="rounded-lg border border-white/10 bg-[#14161b] p-4">
              <Star size={17} className="text-[#ccff00]" />
                <p className="mt-2 text-sm text-white/40">Rating</p>
                <p className="mt-1 font-bold">
                  {workout.rating}
                </p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <div className="rounded-md border border-white/10 px-4 py-2 text-xs">
              <span className="text-white/40">Reps: </span>{" "}
              <span className="font-bold">{workout.reps}</span>
              </div>
              <div className="rounded-md border border-white/10 px-4 py-2 text-xs">
               <span className="text-white/40">Difficulty: </span>{" "}
               <span className="font-bold">{workout.difficulty}</span>
              </div>
            </div>
            <WorkoutActions workout={workout} />
          </div>
        </div>

        <div className="mt-12 max-w-4xl">
          <h2 className="text-2xl font-black uppercase">
            Instructions 
          </h2>
          <div className="mt-5 space-y-3">
            {workout.instructions.map((instruction, index) => (
              <div 
              key={index}
              className="flex gap-4 rounded-lg border border-white/10 bg-[#14161b] p-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#ccff00] text-xs font-black text-black">
                  {index + 1}
                </span>
                <p className="text-sm leading-6 text-white/60">
                {instruction}
                </p>
            </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}