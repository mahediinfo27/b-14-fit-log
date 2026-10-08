"use client";

import Link from "next/link";
import { ArrowLeft, Check, Trash2 } from "lucide-react";
import { useState, useSyncExternalStore } from "react";
type Workout = {
    id: number;
    name: string;
    duration: number;
    caloriesBurned: number;
    muscleGroups: string[];
    equipment: string;
};

const PLAN_KEY = "fitlog-plan";

const subscribe = (callback: () => void) => {
    window.addEventListener("storage", callback);
    window.addEventListener("fitlog-storage", callback);

    return () => {
        window.removeEventListener("storage", callback);
        window.removeEventListener("fitlog-storage", callback);
    };
};

const getPlan = () => {
    return localStorage.getItem(PLAN_KEY) || "[]";
};

const getServerPlan = () => {
    return "[]";
};

export default function MyPlan() {
    const planData = useSyncExternalStore(
        subscribe,
        getPlan,
        getServerPlan
    );

    const workouts = JSON.parse(planData) as Workout[];

    const [completed, setCompleted] = useState<number[]>([]);

    const removeWorkout = (id: number) => {
        const updated = workouts.filter(
            (workout) => workout.id !== id
        );

        localStorage.setItem(
            PLAN_KEY,
            JSON.stringify(updated)
        );

        window.dispatchEvent(new Event("fitlog-storage"));
    };

    const toggleDone = (id: number) => {
        setCompleted((current) =>
            current.includes(id)
                ? current.filter((item) => item !== id)
                : [...current, id]
        );
    };

    const totalMinutes = workouts.reduce(
        (total, workout) => total + workout.duration,
        0
    );

    const totalCalories = workouts.reduce(
        (total, workout) => total + workout.caloriesBurned,
        0
    );

    return (
        <main className="min-h-screen bg-[#0b0c0d] text-white">

            {/* Header */}
            <header className="border-b border-white/10">
                <nav className="mx-auto flex min-h-20 max-w-7xl items-center justify-between px-5 lg:px-8">

                    <Link
                        href="/"
                        className="text-xl font-bold tracking-tight"
                    >
                        FIT<span className="text-[#ccff00]">LOG</span>
                    </Link>

                    <Link
                        href="/"
                        className="flex items-center gap-2 text-xs font-bold uppercase text-white/50 transition hover:text-white"
                    >
                        <ArrowLeft size={15} />
                        Workout Library
                    </Link>
                </nav>
            </header>

            <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#ccff00]">
                        Your Training
                    </p>

                    <h1 className="mt-2 text-4xl font-black uppercase tracking-tight sm:text-5xl">
                        My Plan
                    </h1>

                    <p className="mt-3 text-sm text-white/40">
                        Your selected workouts for today.
                    </p>
                </div>
                <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <div className="rounded-lg border border-white/10 bg-[#14161b] p-5">
                        <p className="text-3xl font-black text-[#ccff00]">
                            {workouts.length}
                        </p>

                        <p className="mt-2 text-xs uppercase text-white/40">
                            Workouts
                        </p>
                    </div>
                    <div className="rounded-lg border border-white/10 bg-[#14161b] p-5">
                        <p className="text-3xl font-black">
                            {completed.length}
                        </p>
                        <p className="mt-2 text-xs uppercase text-white/40">
                            Completed
                        </p>
                    </div>
                    <div className="rounded-lg border border-white/10 bg-[#14161b] p-5">
                        <p className="text-3xl font-black">
                            {totalMinutes}
                        </p>

                        <p className="mt-2 text-xs uppercase text-white/40">
                            Minutes
                        </p>
                    </div>
                    <div className="rounded-lg border border-white/10 bg-[#14161b] p-5">
                        <p className="text-3xl font-black">
                            {totalCalories}
                        </p>
                        <p className="mt-2 text-xs uppercase text-white/40">
                            Calories
                        </p>
                    </div>
                </div>
                {workouts.length === 0 && (
                    <div className="mt-8 flex min-h-[350px] flex-col items-center justify-center rounded-xl border border-dashed border-white/15 bg-[#101216] px-6 text-center">

                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#ccff00] text-black">
                            <Check size={26} strokeWidth={3} />
                        </div>

                        <h2 className="mt-5 text-xl font-black uppercase">
                            Your plan is empty
                        </h2>
                        <p className="mt-2 max-w-md text-sm leading-6 text-white/40">
                            Browse the workout library and add exercises to
                            build your training plan.
                        </p>
                        <Link
                            href="/#library"
                            className="mt-6 rounded-md bg-[#ccff00] px-6 py-3 text-xs font-black uppercase text-black transition hover:bg-[#d8ff33]"
                        >
                            Browse Workouts
                        </Link>

                    </div>
                )}
                {workouts.length > 0 && (
                    <div className="mt-8 space-y-4">
                        {workouts.map((workout) => {
                            const isDone = completed.includes(workout.id);
                            return (
                                <div
                                    key={workout.id}
                                    className={`flex flex-col gap-4 rounded-xl border border-white/10 bg-[#14161b] p-4 transition sm:flex-row sm:items-center ${isDone ? "opacity-50" : ""
                                        }`}
                                >
                                    <img
                                        src="/workout-card-image.png"
                                        alt={workout.name}
                                        className="h-32 w-full rounded-lg object-cover sm:h-24 sm:w-36"
                                    />
                                    <div className="flex-1">

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
                                            className={`mt-2 text-lg font-black uppercase ${isDone ? "line-through" : ""
                                                }`}
                                        >
                                            {workout.name}
                                        </h2>

                                        <p className="mt-1 text-xs text-white/40">
                                            {workout.duration} min ·{" "}
                                            {workout.caloriesBurned} kcal ·{" "}
                                            {workout.equipment}
                                        </p>
                                    </div>
                                    <div className="flex gap-2 sm:flex-col">
                                        <button
                                            onClick={() => toggleDone(workout.id)}
                                            className={`flex items-center justify-center gap-2 rounded-md px-4 py-2 text-xs font-black uppercase transition ${isDone
                                                    ? "bg-white/10 text-white"
                                                    : "bg-[#ccff00] text-black hover:bg-[#d8ff33]"
                                                }`}
                                        >
                                            <Check size={14} />

                                            {isDone ? "Done" : "Complete"}
                                        </button>
                                        <button
                                            onClick={() => removeWorkout(workout.id)}
                                            className="flex items-center justify-center gap-2 rounded-md border border-white/10 px-4 py-2 text-xs font-black uppercase text-white/50 transition hover:border-red-400 hover:text-red-400"
                                        >
                                            <Trash2 size={14} />
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            );
                        })}

                    </div>
                )}

            </section>
        </main>
    );
}