import React, { useState, useRef } from "react";
import { Camera, Upload, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ImageUploaderProps {
  onImageChange: (base64: string | null) => void;
}

export default function ImageUploader({ onImageChange }: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setPreview(base64);
        onImageChange(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setPreview(null);
    onImageChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full h-full">
      <AnimatePresence mode="wait">
        {preview ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative h-full"
          >
            <img
              src={preview}
              alt="Clothing preview"
              className="w-full h-full object-cover grayscale transition-all hover:grayscale-0"
              referrerPolicy="no-referrer"
            />
            <button
              onClick={clearImage}
              className="absolute top-4 right-4 p-2 bg-black text-white hover:bg-white hover:text-black transition-colors shadow-none cursor-pointer"
            >
              <X size={16} />
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="placeholder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full h-full"
          >
            <label className="flex flex-col items-center justify-center w-full h-full border border-white/10 cursor-pointer hover:bg-white/5 transition-all group">
              <div className="flex flex-col items-center justify-center p-8">
                <Camera size={24} strokeWidth={1} className="text-white/20 mb-4" />
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">Upload Piece</p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </label>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
