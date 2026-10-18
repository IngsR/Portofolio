"use client";
import { motion } from "motion/react";
import React, { useState } from "react";
import { cn } from "../utils";

interface AnimatedTabsProps {
  tabs: { id: string; label: string; icon?: React.ReactNode }[];
  activeTab: string;
  onTabChange: (id: string) => void;
  className?: string;
}

export const AnimatedTabs = ({
  tabs,
  activeTab,
  onTabChange,
  className,
}: AnimatedTabsProps) => {
  return (
    <div
      className={cn(
        "flex items-center gap-1 p-1 rounded-full border border-[#36454f]/15 dark:border-white/10 bg-[#36454f]/[0.05] dark:bg-white/[0.04] w-fit",
        className,
      )}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "relative flex flex-1 sm:flex-initial items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-full text-xs font-semibold transition-colors duration-200 z-10",
            activeTab === tab.id
              ? "text-white dark:text-white font-bold"
              : "text-[#485966] dark:text-slate-400 hover:text-[#141f26] dark:hover:text-white hover:bg-[#36454f]/5 dark:hover:bg-white/5",
          )}
        >
          {activeTab === tab.id && (
            <motion.div
              layoutId="active-tab-bg"
              className="absolute inset-0 bg-[#273641] text-white dark:bg-white/15 dark:border dark:border-white/20 rounded-full shadow-xs"
              transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
            />
          )}
          <span
            className={cn(
              "relative z-10 flex items-center gap-1.5 [&>svg]:shrink-0",
              activeTab === tab.id && "text-white dark:text-white font-bold [&>svg]:text-white dark:[&>svg]:text-white",
            )}
          >
            {tab.icon}
            {tab.label}
          </span>
        </button>
      ))}
    </div>
  );
};
