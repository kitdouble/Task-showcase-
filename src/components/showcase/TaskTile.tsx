"use client";

import { motion } from "framer-motion";
import { DOMAIN_COLOURS } from "@/lib/domain-colours";
import type { TaskConfig } from "@/lib/task-config";

interface TaskTileProps {
  task: TaskConfig;
  index: number;
  isFiltered: boolean;
  onClick: () => void;
}

export default function TaskTile({ task, index, isFiltered, onClick }: TaskTileProps) {
  const domainColour = DOMAIN_COLOURS[task.domain];

  return (
    <motion.div
      layout
      initial={{ scaleY: 0.05, rotateX: -60, opacity: 0 }}
      animate={{
        scaleY: isFiltered ? 0.95 : 1,
        rotateX: 0,
        opacity: isFiltered ? 0.2 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 18,
        delay: index * 0.06,
      }}
      whileHover={
        isFiltered
          ? {}
          : { y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.1)" }
      }
      onClick={isFiltered ? undefined : onClick}
      className={`relative bg-surface rounded-lg overflow-hidden border border-border cursor-pointer group ${
        isFiltered ? "pointer-events-none" : ""
      }`}
      style={{
        borderLeft: `4px solid ${domainColour}`,
        transformOrigin: "top center",
      }}
    >
      {/* Preview area */}
      <div className="aspect-[4/3] sm:aspect-[4/3] bg-background/50 flex items-center justify-center relative overflow-hidden">
        <TaskPreviewPlaceholder task={task} />
        {/* Play overlay on hover */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${domainColour}20` }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill={domainColour}
            >
              <polygon points="6,3 18,10 6,17" />
            </svg>
          </div>
        </motion.div>
      </div>

      {/* Info area */}
      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-sm font-medium text-text-primary leading-tight">
            {task.title}
          </h3>
        </div>
        <span
          className="inline-block mt-1 font-body text-[11px] font-semibold uppercase tracking-wider"
          style={{ color: domainColour }}
        >
          {task.cognitiveAbility}
        </span>
      </div>
    </motion.div>
  );
}

function TaskPreviewPlaceholder({ task }: { task: TaskConfig }) {
  const colour = DOMAIN_COLOURS[task.domain];
  return (
    <div className="flex flex-col items-center justify-center gap-2 p-4">
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center opacity-30"
        style={{ backgroundColor: colour }}
      >
        <span className="font-display text-white text-lg font-semibold">
          {task.title.charAt(0)}
        </span>
      </div>
      <span className="font-body text-xs text-text-secondary">{task.domain}</span>
    </div>
  );
}
