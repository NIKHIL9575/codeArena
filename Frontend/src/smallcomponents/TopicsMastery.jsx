import React from "react";

const TopicsMastery = ({ topicsMastery }) => {
  const topicColors = [
    "bg-green-500",
    "bg-pink-500",
    "bg-cyan-400",
    "bg-purple-500",
    "bg-orange-500",
    "bg-blue-500",
    "bg-amber-500",
    "bg-red-500",
    "bg-teal-400",
    "bg-indigo-400",
    "bg-rose-500",
    "bg-lime-500",
    "bg-sky-500",
    "bg-yellow-500",
    "bg-violet-400",
    "bg-fuchsia-500",
    "bg-emerald-400",
  ];

  return (
    <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0f1220] p-6">
      <h2 className="mb-6 text-lg font-bold text-white">
        Topics Mastery
      </h2>

      <div className="max-h-[340px] space-y-4 overflow-y-auto pr-2 custom-scrollbar">
        {topicsMastery?.length > 0 ? (
          topicsMastery.map((item, index) => {
            const percentage = item.total
              ? (item.solved / item.total) * 100
              : 0;

            return (
              <div key={item.topic}>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <span className="truncate text-sm text-sky-200">
                    {item.topic}
                  </span>

                  <span className="shrink-0 text-sm text-slate-500">
                    {item.solved}/{item.total}
                  </span>
                </div>

                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      topicColors[index % topicColors.length]
                    }`}
                    style={{
                      width: `${Math.min(percentage, 100)}%`,
                    }}
                  />
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-sm text-slate-500">
            No topic mastery data available.
          </p>
        )}
      </div>
    </div>
  );
};

export default TopicsMastery;