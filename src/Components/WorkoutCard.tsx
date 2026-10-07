import Link from "next/link";
import { Clock, Flame, Star } from "lucide-react";
import type { Workout } from "@/types/workout";

interface WorkoutCardProps {
  workout: Workout;
}

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group block overflow-hidden rounded-lg border border-white/[0.08] bg-[#14161b] transition hover:border-[#ccff00]/40"
    >
      <div className="h-48 overflow-hidden bg-[#1b1d22]">
        <img
          src="/workout-card-image.png"
          alt={workout.name}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-4">
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

        <h3 className="mt-3 text-lg font-black uppercase leading-tight text-white">
          {workout.name}
        </h3>

        <p className="mt-2 text-xs text-white/40">
          {workout.equipment}
        </p>

        <div className="mt-4 flex items-center gap-4 border-t border-white/[0.08] pt-3 text-xs text-white/50">
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
    </Link>
  );
}