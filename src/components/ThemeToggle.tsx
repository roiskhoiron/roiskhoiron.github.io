import { motion } from "motion/react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed top-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 dark:from-yellow-500 dark:to-orange-500 shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center group"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{
          rotate: theme === "dark" ? 360 : 0,
        }}
        transition={{ duration: 0.5 }}
      >
        {theme === "light" ? (
          <Moon className="w-6 h-6 text-white" />
        ) : (
          <Sun className="w-6 h-6 text-white" />
        )}
      </motion.div>

      {/* Tooltip */}
      <span className="absolute top-full mt-2 right-0 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        {theme === "light" ? "Dark Mode" : "Light Mode"}
      </span>
    </motion.button>
  );
}
