"use client";

import { useEffect, useState } from "react";
import WorkoutCard from "./WorkoutCard";
import type { Workout } from "../types/workout";

const API_URL =
  "https://api.api-store.workers.dev/api/fitlog";

export default function WorkoutLibrary() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Failed to fetch workouts");
        }

        const data: Workout[] = await response.json();
        setWorkouts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <section
      id="library"
      className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8"
    >
    
      <div className="mb-6">
        <h2 className="text-3xl font-black uppercase tracking-[-0.03em]">
          THE LIBRARY
        </h2>

        <p className="mt-1 text-xs text-white/40">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

  
      {loading && (
        <div className="flex min-h-[300px] items-center justify-center">
          <p className="animate-pulse text-sm text-[#ccff00]">
            Loading workouts…
          </p>
        </div>
      )}

      
      {!loading && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {workouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </section>
  );
}