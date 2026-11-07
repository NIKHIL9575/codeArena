import React from "react";

const Difficulty = ({ solvedProblems }) => {
  const stats = {
    easy: {
      solved: solvedProblems?.easy ?? 0,
      total: 0,
    },
    medium: {
      solved: solvedProblems?.medium ?? 0,
      total: 0,
    },
    hard: {
      solved: solvedProblems?.hard ?? 0,
      total: 0,
    },
  };

  const totalSolved =
    stats.easy.solved +
    stats.medium.solved +
    stats.hard.solved;

  const totalProblems =
    stats.easy.total +
    stats.medium.total +
    stats.hard.total;

  const easyPercent = totalSolved
    ? (stats.easy.solved / totalSolved) * 100
    : 0;

  const mediumPercent = totalSolved
    ? (stats.medium.solved / totalSolved) * 100
    : 0;

  const hardPercent = totalSolved
    ? (stats.hard.solved / totalSolved) * 100
    : 0;

  const difficultyData = [
    {
      name: "Easy",
      ...stats.easy,
      color: "bg-green-500",
      textColor: "text-green-500",
    },
    {
      name: "Medium",
      ...stats.medium,
      color: "bg-amber-500",
      textColor: "text-amber-500",
    },
    {
      name: "Hard",
      ...stats.hard,
      color: "bg-red-500",
      textColor: "text-red-500",
    },
  ];

  return (
    <div>
      <h2 className="mb-8 text-lg font-bold">
        Solved by Difficulty
      </h2>

      {/* Circular Chart */}
      <div className="mb-10 flex justify-center">
        <div
          className="flex h-32 w-32 items-center justify-center rounded-full"
          style={{
            background:
              totalSolved === 0
                ? "#1f2937"
                : `conic-gradient(
                    #22c55e 0% ${easyPercent}%,
                    #f59e0b ${easyPercent}% ${easyPercent + mediumPercent}%,
                    #ef4444 ${easyPercent + mediumPercent}% 100%
                  )`,
          }}
        >
          <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full bg-[#0f1220]">
            <h3 className="text-3xl font-bold">
              {totalSolved}
            </h3>
            <p className="text-sm text-slate-500">
              solved
            </p>
          </div>
        </div>
      </div>

      {/* Difficulty Progress Bars */}
      <div className="space-y-4">
        {difficultyData.map((item) => {
          const percentage = totalSolved
            ? (item.solved / totalSolved) * 100
            : 0;

          return (
            <div key={item.name}>
              <div className="mb-2 flex items-center justify-between">
                <span
                  className={`font-medium ${item.textColor}`}
                >
                  {item.name}
                </span>

                <span className="text-sm text-slate-500">
                  {item.solved}
                </span>
              </div>

              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${item.color}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Difficulty;