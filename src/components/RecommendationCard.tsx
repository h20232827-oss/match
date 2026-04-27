import React from "react";
import { ClothRecommendation } from "../types";
import { motion } from "motion/react";

interface RecommendationCardProps extends React.Attributes {
  recommendation: ClothRecommendation;
  index: number;
}

export default function RecommendationCard({ recommendation, index }: RecommendationCardProps): React.JSX.Element {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white p-6 flex flex-col gap-4 group"
    >
      <div className="flex items-start justify-between">
        <span className="px-2 py-1 bg-black/5 rounded-md text-[9px] uppercase tracking-[0.2em] font-bold text-black/60">
          {recommendation.category}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-bold uppercase tracking-tight text-black flex items-center justify-between">
          {recommendation.itemName}
        </h3>
        <p className="text-[11px] text-black/60 leading-relaxed min-h-[3rem]">
          {recommendation.description}
        </p>
      </div>
      <div className="mt-4 pt-4 border-t border-black/5">
        <p className="text-[9px] uppercase tracking-widest text-black/40 mb-2">Styling Note</p>
        <p className="text-[10px] text-black/80 italic leading-relaxed">
          {recommendation.stylingTip}
        </p>
      </div>
    </motion.div>
  );
}
