import { motion } from "motion/react";
import { Image as ImageIcon } from "lucide-react";

interface PhotoSwitcherProps {
  currentPhoto: number;
  onPhotoChange: (index: number) => void;
  totalPhotos: number;
}

export function PhotoSwitcher({ currentPhoto, onPhotoChange, totalPhotos }: PhotoSwitcherProps) {
  return (
    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-20">
      <div className="bg-white dark:bg-slate-800 rounded-full shadow-xl border-4 border-white dark:border-slate-700 px-4 py-2 flex items-center gap-3">
        <ImageIcon className="w-4 h-4 text-slate-600 dark:text-slate-300" />
        <div className="flex gap-2">
          {Array.from({ length: totalPhotos }).map((_, index) => (
            <motion.button
              key={index}
              onClick={() => onPhotoChange(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className={`w-3 h-3 rounded-full transition-all ${
                currentPhoto === index
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 w-8"
                  : "bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500"
              }`}
              aria-label={`Switch to photo ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
