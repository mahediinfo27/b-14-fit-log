"use client";

import Link from "next/link";
import { ArrowLeft, Check, Trash2 } from "lucide-react"

export default function MyPlan() {
    return (
        <main className="min-h-screen bg-[#0b0c0d] text-white">
            <header className="border-b border-white/10">
                <nav className="mx-auto flex min-h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
                    <Link
                        href="/"
                        className="text-xl font-bold tracking-tight">
                        FIT<span className="text-[#ccff00]">LOG</span>
                    </Link>
                    <Link
                        href="/"
                        className="flex items-centera gap-2 text-xs font-bold uppercase text-white/50 hover:text-white">
                        <ArrowLeft size={15} />
                        Workout Library
                    </Link>
                </nav>
            </header>
            <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.em] text-[#ccff00]">
                        Your Training
                    </p>
                    <h1 className="mt-2 text-4xl font-black uppercase tracking-tight sm:text-5xl">
                        My Plan
                    </h1>
                    <p className="mt-3 text-sm text-white/40">
                        Your selected workout for today.</p>
                </div>
                <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <div className="rounded-lg border border-white/10 bg-[#14161b] p-5">
                        <p className="text-3xl font-black text-[#ccff00]">0</p>
                        <p className="mt-2 text-xs uppercase text-white/40">
                            Workouts
                        </p>
                    </div>

                    <div className="rounded-lg border border-white/10 bg-[#14161b] p-5">
                        <p className="text-3xl font-black">0</p>
                        <p className="mt-2 text-xs uppercase text-white/40">
                            Completed
                        </p>
                    </div>
                    <div className="rounded-lg border border-white/40 bg-[#14161b]">
                        <p className="mt-2 text-xs uppercase text-white/40">
                            Minutes
                        </p>
                    </div>

                    <div className="rounded-lg: border border-white/10 bg-[#14161b] p-5">
                        <p className="text-3xl font-black">0</p>
                        <p className="mt-2 text-xs uppercase text-white/40">
                            Calories
                        </p>
                    </div>
                </div>

                <div className="mt-8 flex min-h-[350px] flex-col items-center justify-center rounded-xl border border-dashed border-white/15 bg-[#101216] px-6 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#ccff00] text-black">
                        <Check size={26} strokeWidth={3} />
                    </div>
                    <h2 className="mt-5 text-xl font-black uppercase">
                        Your plan is empty
                    </h2>
                    <p className="mt-2 max-w-md text-sm leading-6 text-white/40">
                        Browse the workout library and add exercises to build
                        your training plan.
                    </p>

                    <Link
                        href="/"
                        className="mt-6 rounded-md bg-[#ccff00] px-6 py-3 text-xs font-black uppercase text-black transition hover:bg-[#d8ff33]"
                    >    Browse Workouts
                    </Link>
                </div>
                <div className="mt-6 flex justify-end gap-2">
                    <button className="flex items-center gap-2 rounded-md border border-white/10 px-4 py-2 text-xs font-bold uppercase text-white/40">
                        <Check size={14} />
                        Done
                    </button>

                    <button className=" flex items-center gap-2 rounded-md border border-white/10 px-4 py-2 text-xs font-bold uppercase text-white/40">
                        <Trash2 size={14} />
                        Remove
                    </button>
                </div>
            </section>
        </main>
    );
}