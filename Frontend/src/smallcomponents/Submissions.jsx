import React from "react";

const Submissions = () => {
  // Dummy data — replace with backend data later
  const submissions = [
    {
      id: 1,
      problem: "Trapping Rain Water",
      difficulty: "Hard",
      language: "Python",
      verdict: "Accepted",
      runtime: "48ms",
      daysAgo: 2,
    },
    {
      id: 2,
      problem: "Coin Change II",
      difficulty: "Medium",
      language: "Python",
      verdict: "Accepted",
      runtime: "120ms",
      daysAgo: 5,
    },
    {
      id: 3,
      problem: "Minimum Window Substring",
      difficulty: "Hard",
      language: "C++",
      verdict: "Wrong Answer",
      runtime: "-",
      daysAgo: 1,
    },
    {
      id: 4,
      problem: "LRU Cache",
      difficulty: "Medium",
      language: "Python",
      verdict: "Accepted",
      runtime: "208ms",
      daysAgo: 2,
    },
    {
      id: 5,
      problem: "Word Ladder II",
      difficulty: "Hard",
      language: "Python",
      verdict: "Time Limit",
      runtime: "-",
      daysAgo: 3,
    },
  ];

  const difficultyStyles = {
    Easy: "bg-green-500/10 text-green-400 border-green-500/30",
    Medium: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    Hard: "bg-red-500/10 text-red-400 border-red-500/30",
  };

  const verdictStyles = {
    Accepted: "text-green-500",
    "Wrong Answer": "text-red-500",
    "Time Limit": "text-amber-500",
    "Compilation Error": "text-purple-400",
    "Runtime Error": "text-orange-500",
  };

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-white/10 bg-[#090c14]">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px] border-collapse text-left">
          {/* Header */}
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.02] text-sm text-slate-500">
              <th className="px-6 py-4 font-mono font-normal">Problem</th>
              <th className="px-4 py-4 font-mono font-normal">Difficulty</th>
              <th className="px-4 py-4 font-mono font-normal">Lang</th>
              <th className="px-4 py-4 font-mono font-normal">Verdict</th>
              <th className="px-4 py-4 font-mono font-normal">Runtime</th>
              <th className="px-4 py-4 font-mono font-normal">When</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {submissions.map((item) => (
              <tr
                key={item.id}
                className="border-b border-white/[0.06] last:border-b-0 transition-colors hover:bg-white/[0.03]"
              >
                <td className="px-6 py-5 font-medium text-slate-100">
                  {item.problem}
                </td>

                <td className="px-4 py-5">
                  <span
                    className={`inline-block min-w-[120px] rounded-xl border px-3 py-1 text-sm ${
                      difficultyStyles[item.difficulty]
                    }`}
                  >
                    {item.difficulty}
                  </span>
                </td>

                <td className="px-4 py-5 font-mono text-sm text-slate-400">
                  {item.language}
                </td>

                <td
                  className={`px-4 py-5 font-mono text-sm font-semibold ${
                    verdictStyles[item.verdict] || "text-slate-400"
                  }`}
                >
                  {item.verdict}
                </td>

                <td className="px-4 py-5 font-mono text-sm text-slate-400">
                  {item.runtime}
                </td>

                <td className="whitespace-nowrap px-4 py-5 font-mono text-sm text-slate-500">
                  {item.daysAgo === 0
                    ? "Today"
                    : `${item.daysAgo} ${item.daysAgo === 1 ? "day" : "days"} ago`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Submissions;