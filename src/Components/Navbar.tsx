"use client";

import Link from "next/link";
import { Dumbbell } from "lucide-react";

export default function Navbar() {
    return (
        <header className="border-b border-white/10 bg-[#0b0b0b]">
            <nav className="mx-auto flex min-h-20 max-w-7xl items-center justify-between px-5 lg:px-8">

                <Link href="/" className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ccff00] text-black">
                        <Dumbbell size={20} strokeWidth={2.5} />
                    </div>
                    <span className="text-xl font-black tracking-tight text-white">
                        FITLOG</span>
                </Link>
                <div className="hidden items-center gap-8 md:flex">
                    <Link
                        href="/"
                        className="text-sm font-semibold uppercase tracking-wide text-[#ccff00]"
                    >
                        Workout
                    </Link>

                    <Link
                        href="/my-plan"
                        className="text-sm font-semibold uppercase tracking-wide text-white/60">
                        My Plan
                    </Link>
                </div>

                <div className="flex items-center gap-2">
                    <Link
                        href="/my-plan"
                        className="rounded-full bg-[#ccff00] px-4 py-2 text-xs font-black uppercase text-black"
                    >
                        Plan 0
                    </Link>

                    <Link
                        href="/my-plan"
                        className="rounded-full border-white/30 px-4 py-2 text-xs font-black uppercase text-white">
                        Saved 0
                    </Link>
                </div>
            </nav>
        </header>
    );
}