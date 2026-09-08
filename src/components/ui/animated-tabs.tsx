"use client";
import { motion } from "motion/react";
import React, { useState } from "react";
import { cn } from "./utils";

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
        "flex items-center gap-1 p-1 rounded-full border border-slate-200 dark:border-white/10 bg-slate-100/80 dark:bg-white/[0.03] w-fit",
        className
      )}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "relative flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-colors duration-200 z-10",
            activeTab === tab.id
              ? "text-slate-950"
              : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          )}
        >
          {activeTab === tab.id && (
            <motion.div
              layoutId="active-tab-bg"
              className="absolute inset-0 bg-white dark:bg-white rounded-full shadow-xs"
              transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-1.5">
            {tab.icon}
            {tab.label}
          </span>
        </button>
      ))}
    </div>
  );
};
