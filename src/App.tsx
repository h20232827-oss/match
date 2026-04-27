import React, { useState } from "react";
import { Sparkles, Shirt, Info, RefreshCcw, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import ImageUploader from "./components/ImageUploader";
import MoodSelector from "./components/MoodSelector";
import RecommendationCard from "./components/RecommendationCard";
import { analyzeStyle } from "./services/gemini";
import { AnalysisResponse, Mood, Gender } from "./types";

export default function App() {
  const [image, setImage] = useState<string | null>(null);
  const [features, setFeatures] = useState("");
  const [selectedMood, setSelectedMood] = useState<Mood>("Casual");
  const [selectedGender, setSelectedGender] = useState<Gender>("Female");
  const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!image && !features.trim()) {
      setError("사진이나 옷의 특징을 입력해주세요!");
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const result = await analyzeStyle(image, features, selectedMood, selectedGender);
      setAnalysis(result);
    } catch (err: any) {
      setError("분석 중 오류가 발생했습니다. 다시 시도해주세요.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setImage(null);
    setFeatures("");
    setAnalysis(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-12 px-6 sm:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/10 pb-8 mb-12">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl sm:text-7xl font-serif italic tracking-tighter text-white"
            >
              Curated Match
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-[10px] uppercase tracking-[0.4em] text-white/40 mt-2"
            >
              Professional AI Stylist Assistant
            </motion.p>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center gap-4">
            <div className="flex bg-white/5 border border-white/10 p-1">
              {(['Male', 'Female'] as Gender[]).map((g) => (
                <button
                  key={g}
                  onClick={() => setSelectedGender(g)}
                  className={`px-4 py-1 text-[10px] uppercase tracking-widest transition-all ${
                    selectedGender === g ? "bg-white text-black" : "text-white/40 hover:text-white"
                  }`}
                >
                  {g === 'Male' ? 'Homme' : 'Femme'}
                </button>
              ))}
            </div>
            <p className="text-[10px] uppercase tracking-widest text-white/20 hidden md:block">Session 04 // Spring Edition</p>
          </div>
        </header>

        <main>
          {!analysis ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12"
            >
              {/* Input Section - Larger */}
              <div className="lg:col-span-9 flex flex-col gap-10">
                <section className="flex flex-col sm:flex-row gap-10 items-stretch">
                  <div className="w-full sm:w-1/2 aspect-[3/4] bg-[#111111] border border-white/5">
                    <ImageUploader onImageChange={setImage} />
                  </div>
                  <div className="w-full sm:w-1/2 flex flex-col pt-4">
                    <label className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-6 flex items-center gap-2">
                       Characteristics
                    </label>
                    <textarea
                      value={features}
                      onChange={(e) => setFeatures(e.target.value)}
                      placeholder="e.g. Oversized linen shirt with navy stripes, lightweight fabric..."
                      className="flex-1 w-full p-0 bg-transparent border-b border-white/10 focus:border-white outline-none text-sm leading-relaxed text-white transition-all resize-none placeholder:text-white/10"
                    />
                  </div>
                </section>

                <div className="flex flex-col gap-6">
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-red-400 text-[10px] uppercase tracking-widest bg-red-400/5 p-4 border border-red-400/20"
                    >
                      {error}
                    </motion.p>
                  )}
                  <button
                    onClick={handleAnalyze}
                    disabled={isLoading}
                    className="group relative w-full py-6 bg-white text-black text-xs uppercase tracking-[0.4em] font-medium overflow-hidden transition-all hover:bg-neutral-200 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-4"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="animate-spin" size={14} />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        Analyze Style
                        <Sparkles size={14} className="transition-transform group-hover:scale-110" />
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Mood Selection - Smaller/Sidebar */}
              <div className="lg:col-span-3 border-l border-white/5 pl-0 lg:pl-12">
                <section>
                  <label className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-10 block">
                    Desired Mood
                  </label>
                  <MoodSelector selectedMood={selectedMood} onMoodSelect={setSelectedMood} />
                </section>
                
                <div className="mt-12 pt-12 border-t border-white/5 hidden lg:block">
                  <div className="relative aspect-[4/5] bg-[#111111] overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop" 
                      alt="Fashion background" 
                      className="w-full h-full object-cover grayscale opacity-20 transition-all duration-1000 hover:opacity-40 hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 leading-loose">
                        "Fashion is about dressing according to what's fashionable. Style is more about being yourself."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-16"
            >
              {/* Results Left - Summary */}
              <div className="lg:col-span-4 space-y-12">
                <section>
                  <h2 className="text-[10px] uppercase tracking-[0.3em] text-white/20 mb-8">Analysis</h2>
                  <p className="text-xl font-light leading-relaxed text-white">
                    {analysis.inputAnalysis}
                  </p>
                </section>

                <section className="p-8 border border-white/5 bg-white/5">
                  <div className="flex items-center gap-3 mb-6">
                    <Sparkles size={16} className="text-white/60" />
                    <h2 className="text-[10px] uppercase tracking-[0.3em] text-white/60">Stylist's Note</h2>
                  </div>
                  <p className="text-xs text-white/40 leading-relaxed italic">
                    "{analysis.overallTip}"
                  </p>
                </section>

                <button
                  onClick={reset}
                  className="w-full py-4 border border-white/10 text-white text-[10px] uppercase tracking-[0.4em] flex items-center justify-center gap-4 hover:bg-white hover:text-black transition-all"
                >
                  <RefreshCcw size={14} />
                  Reset Curations
                </button>
              </div>

              {/* Results Right - Items */}
              <div className="lg:col-span-8">
                <div className="flex justify-between items-baseline mb-12 border-b border-white/10 pb-6">
                  <h2 className="text-3xl font-serif italic text-white leading-none">Recommendations</h2>
                  <span className="text-[10px] uppercase tracking-widest text-white/20">
                    {analysis.recommendations.length} Matches Found
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {analysis.recommendations.map((rec, idx) => (
                    <div key={idx}>
                      <RecommendationCard recommendation={rec} index={idx} />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </main>

        <footer className="mt-24 pt-8 border-t border-white/5 flex justify-between items-center text-[9px] uppercase tracking-[0.34em] text-white/20">
          <div>Your Wardrobe AI v2.4.0</div>
          <div>Designed for Modern Living</div>
        </footer>
      </div>
    </div>
  );
}
