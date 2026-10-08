"use client";

import { useCallback, useSyncExternalStore } from "react";
import type { Workout } from "../types/workout";

interface WorkoutActionsProps {
  workout: Workout;
}

const PLAN_KEY = "fitlog-plan";
const SAVED_KEY = "fitlog-saved";

function useWorkoutStorage(key: string, workoutId: number) {
  const subscribe = useCallback((callback: () => void) => {
    window.addEventListener("storage", callback);
    window.addEventListener("fitlog-storage", callback);

    return () => {
      window.removeEventListener("storage", callback);
      window.removeEventListener("fitlog-storage", callback);
    };
  }, []);

  const getSnapshot = useCallback(() => {
    const data = JSON.parse(
      localStorage.getItem(key) || "[]"
    ) as Workout[];

    return data.some((item) => item.id === workoutId);
  }, [key, workoutId]);

  const getServerSnapshot = useCallback(() => false, []);

  return useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );
}

export default function WorkoutActions({
  workout,
}: WorkoutActionsProps) {
  const inPlan = useWorkoutStorage(PLAN_KEY, workout.id);
  const saved = useWorkoutStorage(SAVED_KEY, workout.id);

  const addToPlan = () => {
    const plan = JSON.parse(
      localStorage.getItem(PLAN_KEY) || "[]"
    ) as Workout[];

    if (plan.some((item) => item.id === workout.id)) {
      return;
    }

    if (plan.length >= 5) {
      alert("You can add maximum 5 workouts to your plan.");
      return;
    }

    localStorage.setItem(
      PLAN_KEY,
      JSON.stringify([...plan, workout])
    );

    window.dispatchEvent(new Event("fitlog-storage"));
  };

  const toggleSave = () => {
    const savedWorkouts = JSON.parse(
      localStorage.getItem(SAVED_KEY) || "[]"
    ) as Workout[];

    if (saved) {
      const updated = savedWorkouts.filter(
        (item) => item.id !== workout.id
      );

      localStorage.setItem(
        SAVED_KEY,
        JSON.stringify(updated)
      );
    } else {
      localStorage.setItem(
        SAVED_KEY,
        JSON.stringify([...savedWorkouts, workout])
      );
    }

    window.dispatchEvent(new Event("fitlog-storage"));
  };

  return (
    <div className="mt-7 flex flex-wrap gap-3">
      <button
        onClick={addToPlan}
        disabled={inPlan}
        className={`rounded-md px-6 py-3 text-xs font-black uppercase transition ${
          inPlan
            ? "cursor-not-allowed bg-white/20 text-white/50"
            : "bg-[#ccff00] text-black hover:bg-[#d8ff33]"
        }`}
      >
        {inPlan ? "Added to Plan" : "Add to Plan"}
      </button>

      <button
        onClick={toggleSave}
        className={`rounded-md border px-6 py-3 text-xs font-black uppercase transition ${
          saved
            ? "border-[#ccff00] text-[#ccff00]"
            : "border-white/20 text-white hover:border-[#ccff00] hover:text-[#ccff00]"
        }`}
      >
        {saved ? "Saved ✓" : "Save Workout"}
      </button>
    </div>
  );
}