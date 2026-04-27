import React from "react";
import { MOODS, Mood } from "../types";
import { motion } from "motion/react";

interface MoodSelectorProps {
  selectedMood: Mood;
  onMoodSelect: (mood: Mood) => void;
}

export default function MoodSelector({ selectedMood, onMoodSelect }: MoodSelectorProps) {
  return (
    <div className="flex flex-col gap-1">
      {MOODS.map((mood) => {
        const isActive = selectedMood === mood.value;
        return (
          <button
            key={mood.value}
            onClick={() => onMoodSelect(mood.value)}
            className={`w-full text-left py-4 px-0 border-b border-white/5 uppercase tracking-[0.3em] text-[10px] transition-all cursor-pointer ${
              isActive ? "mood-button-active" : "mood-button-inactive"
            }`}
          >
            {mood.label}
          </button>
        );
      })}
    </div>
  );
}
