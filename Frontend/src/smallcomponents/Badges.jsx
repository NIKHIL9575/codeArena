import React from "react";
import { useNavigate } from "react-router-dom";

const Badges = () => {
  const navigate = useNavigate();

  // Dummy data — replace with backend data later
  const stats = {
    totalSolved: 0,
    easySolved: 0,
    mediumSolved: 0,
    hardSolved: 0,
  };

  // 6 badges with individual requirements
  const badges = [
    {
      id: 1,
      name: "First Steps",
      description: "Solve your first problem",
      icon: "🎯",
      unlocked: stats.totalSolved >= 1,
    },
    {
      id: 2,
      name: "Half Century",
      description: "Solve 50 problems",
      icon: "🥈",
      unlocked: stats.totalSolved >= 50,
    },
    {
      id: 3,
      name: "Century Club",
      description: "Solve 100 problems",
      icon: "🏆",
      unlocked: stats.totalSolved >= 100,
    },
    {
      id: 4,
      name: "Easy Explorer",
      description: "Solve 25 Easy problems",
      icon: "🟢",
      unlocked: stats.easySolved >= 25,
    },
    {
      id: 5,
      name: "Medium Master",
      description: "Solve 25 Medium problems",
      icon: "⚡",
      unlocked: stats.mediumSolved >= 25,
    },
    {
      id: 6,
      name: "Hard Crusher",
      description: "Solve 15 Hard problems",
      icon: "🔥",
      unlocked: stats.hardSolved >= 15,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {badges.map((badge) => (
        <div
          key={badge.id}
          className="relative min-h-[185px] overflow-hidden rounded-2xl border border-white/10 bg-[#0f1220]"
        >
          {/* Badge Content */}
          <div
            className={`flex min-h-[185px] flex-col items-center justify-center p-5 text-center ${
              !badge.unlocked ? "blur-[5px] select-none" : ""
            }`}
          >
            <div className="mb-4 text-4xl">{badge.icon}</div>

            <h3 className="mb-2 font-bold text-white">
              {badge.name}
            </h3>

            <p className="text-sm text-slate-400">
              {badge.description}
            </p>

            {badge.unlocked && (
              <span className="mt-3 text-xs font-semibold text-green-400">
                ✓ Unlocked
              </span>
            )}
          </div>

          {/* Locked Overlay */}
          {!badge.unlocked && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40">
              <button
                onClick={() => navigate("/problems")}
                className="rounded-lg border border-violet-400/40 bg-violet-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-violet-500"
              >
                🔓 Unlock
              </button>

              <p className="mt-3 text-xs text-slate-400">
                Complete the requirement to unlock
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Badges;