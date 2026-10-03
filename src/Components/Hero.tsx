import Link from "next/link";
import Image from "next/image";

export default function Hero() {
    return (
        <section className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
            <div className="relative min-h-[300px] overflow-hidden rounded-lg border border-white/[0.08] bg-[#14161b] sm:min-h-[320px] lg:min-h-[340px]">

                <div className="relative z-10 flex h-full max-w-[62%] flex-col justify-center px-7 py-8 sm:px-9">
                    <p className="mb-3 text-[7px] font-bold uppercase tracking-[0.18em] text-[#ccff00] sm:text-[8px]">
                        Workout Library
                    </p>
                    <h1 className="max-w-[370px] text-[30px] font-black uppercase leading-[0.9] tracking-[-0.04em] text-white sm:text-[34px] lg:text-[38px]">
                        Train With Intent. Log
                        <br />
                        Every Set.
                    </h1>

                    <p className="mt-4 max-w-[390px] text-[8px] leading-[1.5] text-white/45 sm:text-[10px]">
                        FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
                        into today&apos;s plan, and watch the week&apos;s work add up.
                    </p>
                    <Link
                        href="#library"
                        className="mt-7 flex w-fit items-center gap-2 rounded-[4px] bg-[#ccff00] px-5 py-3 text-[7px] font-black uppercase text-black transition hover:bg-[#d8ff33] sm:text-[8px]"
                    >
                        Browse Workouts
                    </Link>
                </div>

                <div className="absolute bottom-0 right-4 flex h-full w-[38%] items-end justify-center sm:right-8 lg:right-12 lg:w-[35%]">
                    <Image
                        src="/banner.png"
                        alt="Workout illustration"
                        width={500}
                        height={500}
                        className="h-[92%] w-auto object-contain object-bottom"
                    />
                </div>
            </div>
        </section>
    );
}