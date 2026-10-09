import Link from "next/link";
import { Dumbbell } from "lucide-react";

export default function Footer() {
    return(
        <footer className="border-t border-white/10 bg-[#0b0c0d]">
            <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
                <Link href="/" className="flex w-fit items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ccff00] text-black">
                    <Dumbbell size={17} />
                    </span> 

                    <span className="text-lg- font-black">
                        FITLOG
                    </span>
                </Link>
                <p className="text-xs leading-5 text-white/40">
                  © 2026 FitLog — Workout Library. Train hard, log honest.
                </p>
            </div>
        </footer>
    )
}