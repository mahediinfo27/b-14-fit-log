
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft, 
  Check,
  Clock,
  Flame,
  Star,
  Trash2,
  Dumbbell,
} from "lucide-react";

type Workout = {
  id: number;
  name: string;
  muscleGroups: string[];
  equipment: string;
  duration: number;
  caloriesBurned: number;
  rating: number;
};

const PLAN_KEY = "fitlog-plan";
const SAVED_KEY = "fitlog-saved";
const DONE_KEY = "fitlog-completed";

type Tab = "plan" | "saved";

function readWorkouts(key: string): Workout[] {
  try {
    const data = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export default function MyPlan() {
  const [activeTab, setActiveTab] = useState<Tab>("plan");
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [savedWorkouts, setSavedWorkouts] = useState<Workout[]>([]);
  const [completed, setCompleted] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const loadData = () => {
      setWorkouts(readWorkouts(PLAN_KEY));
      setSavedWorkouts(readWorkouts(SAVED_KEY));

      try {
        const done = JSON.parse(
          localStorage.getItem(DONE_KEY) || "[]"
        );
        setCompleted(Array.isArray(done) ? done : []);
      } catch {
        setCompleted([]);
      }

      setLoading(false);
    };

    loadData();
    window.addEventListener("fitlog-storage", loadData);
    window.addEventListener("storage", loadData);

    return () => {
      window.removeEventListener("fitlog-storage", loadData);
      window.removeEventListener("storage", loadData);
    };
  }, []);

  useEffect(() => {
    if (!toast) return;

    const timer = window.setTimeout(() => setToast(""), 2500);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const currentList =
    activeTab === "plan" ? workouts : savedWorkouts;

  const totalMinutes = workouts.reduce(
    (sum, workout) => sum + workout.duration,
    0
  );

  const totalCalories = workouts.reduce(
    (sum, workout) => sum + workout.caloriesBurned,
    0
  );

  function removeWorkout(id: number) {
    if (activeTab === "plan") {
      const updated = workouts.filter((item) => item.id !== id);
      setWorkouts(updated);
      localStorage.setItem(PLAN_KEY, JSON.stringify(updated));

      const updatedDone = completed.filter((item) => item !== id);
      setCompleted(updatedDone);
      localStorage.setItem(DONE_KEY, JSON.stringify(updatedDone));
    } else {
      const updated = savedWorkouts.filter((item) => item.id !== id);
      setSavedWorkouts(updated);
      localStorage.setItem(SAVED_KEY, JSON.stringify(updated));
    }

    window.dispatchEvent(new Event("fitlog-storage"));
    setToast(activeTab === "plan" ? "Workout removed from plan" : "Workout removed from saved");
  }

  function toggleDone(id: number) {
    const updated = completed.includes(id)
      ? completed.filter((item) => item !== id)
      : [...completed, id];

    setCompleted(updated);
    localStorage.setItem(DONE_KEY, JSON.stringify(updated));
    setToast(updated.includes(id) ? "Workout marked as done!" : "Workout marked as not done");
  }

  function moveToPlan(workout: Workout) {
    if (workouts.some((item) => item.id === workout.id)) {
      setToast("Workout is already in your plan");
      return;
    }

    if (workouts.length >= 5) {
      setToast("Your plan is full. Maximum 5 workouts.");
      return;
    }

    const updated = [...workouts, workout];
    setWorkouts(updated);
    localStorage.setItem(PLAN_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("fitlog-storage"));
    setToast("Added to today's plan");
  }

  return (
    <main className="min-h-screen bg-[#0b0c0d] text-white">
      <header className="border-b border-white/10 bg-[#0b0c0d]">
        <nav className="mx-auto flex min-h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ccff00] text-black">
              <Dumbbell size={19} />
            </span>
            <span className="text-xl font-black">
              FIT<span className="text-[#ccff00]">LOG</span>
            </span>
          </Link>

          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-bold uppercase text-white/60 hover:text-[#ccff00]"
          >
            <ArrowLeft size={15} />
            <span className="hidden sm:inline">Workout Library</span>
            <span className="sm:hidden">Back</span>
          </Link>
        </nav>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#ccff00]">
          Your Training
        </p>

        <h1 className="mt-2 text-4xl font-black uppercase tracking-tight sm:text-5xl">
          My Plan
        </h1>

        <p className="mt-3 text-sm text-white/40">
            Cap of five lifts for today. Finish them, then load more.
        </p>

        {/* Metrics */}
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-white/10 bg-[#14161b] p-5">
            <p className="text-3xl font-black text-[#ccff00]">
              {workouts.length}
            </p>
            <p className="mt-2 text-xs uppercase text-white/40">
              Exercises
            </p>
          </div>

          <div className="rounded-lg border border-white/10 bg-[#14161b] p-5">
            <p className="text-3xl font-black">{totalMinutes}</p>
            <p className="mt-2 text-xs uppercase text-white/40">
              Minutes
            </p>
          </div>

          <div className="rounded-lg border border-white/10 bg-[#14161b] p-5">
            <p className="text-3xl font-black">{totalCalories}</p>
            <p className="mt-2 text-xs uppercase text-white/40">
              Calories
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-9 flex gap-6 border-b border-white/10">
          <button
            onClick={() => setActiveTab("plan")}
            className={`border-b-2 px-1 pb-3 text-xs font-black uppercase transition ${
              activeTab === "plan"
                ? "border-[#ccff00] text-[#ccff00]"
                : "border-transparent text-white/40 hover:text-white"
            }`}
          >
            Today&apos;s Plan ({workouts.length})
          </button>

          <button
            onClick={() => setActiveTab("saved")}
            className={`border-b-2 px-1 pb-3 text-xs font-black uppercase transition ${
              activeTab === "saved"
                ? "border-[#ccff00] text-[#ccff00]"
                : "border-transparent text-white/40 hover:text-white"
            }`}
          >
            Saved ({savedWorkouts.length})
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex min-h-[250px] items-center justify-center">
            <p className="animate-pulse text-sm text-[#ccff00]">
              Loading workouts…
            </p>
          </div>
        )}

        {/* Empty state */}
        {!loading && currentList.length === 0 && (
          <div className="mt-6 flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-dashed border-white/15 bg-[#101216] px-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#ccff00] text-black">
              <Dumbbell size={25} />
            </div>

            <h2 className="mt-5 text-xl font-black uppercase">
              Nothing Here Yet
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-white/40">
              {activeTab === "plan"
                ? "Browse the library and add a lift to get today moving."
                : "Save a workout for later and it will appear here."}
            </p>

            <Link
              href="/#library"
              className="mt-6 rounded-md bg-[#ccff00] px-6 py-3 text-xs font-black uppercase text-black hover:bg-[#d8ff33]"
            >
              Go to Workouts
            </Link>
          </div>
        )}

        {/* Workout cards */}
        {!loading && currentList.length > 0 && (
          <div className="mt-6 space-y-4">
            {currentList.map((workout) => {
              const isDone = completed.includes(workout.id);

              return (
                <article
                  key={workout.id}
                  className={`flex flex-col gap-4 rounded-xl border border-white/10 bg-[#14161b] p-4 sm:flex-row sm:items-center ${
                    isDone && activeTab === "plan" ? "opacity-60" : ""
                  }`}
                >
                  <img
                    src="/workout-card-image.png"
                    alt={workout.name}
                    className="h-40 w-full rounded-lg bg-[#1b1d22] object-cover sm:h-28 sm:w-40"
                  />

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap gap-2">
                      {workout.muscleGroups.map((group) => (
                        <span
                          key={group}
                          className="rounded-full bg-[#ccff00] px-2 py-1 text-[9px] font-black uppercase text-black"
                        >
                          {group}
                        </span>
                      ))}
                    </div>

                    <h2
                      className={`mt-3 text-lg font-black uppercase ${
                        isDone && activeTab === "plan" ? "line-through" : ""
                      }`}
                    >
                      {workout.name}
                    </h2>

                    <p className="mt-1 text-xs text-white/40">
                      {workout.equipment}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-4 text-xs text-white/50">
                      <span className="flex items-center gap-1">
                        <Clock size={13} />
                        {workout.duration} min
                      </span>
                      <span className="flex items-center gap-1">
                        <Flame size={13} />
                        {workout.caloriesBurned} kcal
                      </span>
                      <span className="flex items-center gap-1">
                        <Star size={13} />
                        {workout.rating}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 sm:max-w-[160px] sm:flex-col">
                    <Link
                      href={`/workout/${workout.id}`}
                      className="flex items-center justify-center rounded-md border border-white/15 px-3 py-2 text-center text-[10px] font-black uppercase hover:border-[#ccff00] hover:text-[#ccff00]"
                    >
                      View Details
                    </Link>

                    {activeTab === "plan" ? (
                      <button
                        onClick={() => toggleDone(workout.id)}
                        className={`flex items-center justify-center gap-1 rounded-md px-3 py-2 text-[10px] font-black uppercase ${
                          isDone
                            ? "border border-white/15 text-white/60"
                            : "bg-[#ccff00] text-black hover:bg-[#d8ff33]"
                        }`}
                      >
                        <Check size={13} />
                        {isDone ? "Mark Undone" : "Mark as Done"}
                      </button>
                    ) : (
                      <button
                        onClick={() => moveToPlan(workout)}
                        className="rounded-md bg-[#ccff00] px-3 py-2 text-[10px] font-black uppercase text-black hover:bg-[#d8ff33]"
                      >
                        Add to Plan
                      </button>
                    )}

                    <button
                      onClick={() => removeWorkout(workout.id)}
                      aria-label={`Remove ${workout.name}`}
                      className="flex items-center justify-center gap-1 rounded-md border border-white/10 px-3 py-2 text-[10px] font-black uppercase text-white/50 hover:border-red-400 hover:text-red-400"
                    >
                      <Trash2 size={13} />
                      Remove
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* Toast */}
      {toast && (
        <div
          role="status"
          className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-lg border border-[#ccff00]/30 bg-[#14161b] px-5 py-3 text-sm font-semibold text-white shadow-xl"
        >
          <span className="mr-2 text-[#ccff00]">✓</span>
          {toast}
        </div>
      )}
    </main>
  );
}
