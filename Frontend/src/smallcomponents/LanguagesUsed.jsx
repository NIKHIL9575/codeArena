import React from "react";

const LanguagesUsed = ({ languagesUsed }) => {
  const languageColors = [
    "bg-indigo-500",
    "bg-cyan-400",
    "bg-amber-500",
    "bg-green-500",
    "bg-pink-500",
    "bg-purple-500",
  ];

  return (
    <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0f1220] p-6">
      <h2 className="mb-6 text-lg font-bold text-white">
        Languages Used
      </h2>

      <div className="space-y-5">
        {languagesUsed?.length > 0 ? (
          languagesUsed.map((item, index) => (
            <div
              key={item.language}
              className="flex items-center gap-4"
            >
              <span className="w-[65px] shrink-0 text-sm text-sky-200">
                {item.language}
              </span>

              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    languageColors[index % languageColors.length]
                  }`}
                  style={{
                    width: `${Math.min(item.percentage ?? 0, 100)}%`,
                  }}
                />
              </div>

              <span className="w-10 shrink-0 text-right text-sm text-slate-500">
                {item.percentage ?? 0}%
              </span>
            </div>
          ))
        ) : (
          <p className="text-sm text-slate-500">
            No languages used yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default LanguagesUsed;