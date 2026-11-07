import React from "react";

const Activity = ({ activityDates }) => {
  const activitySet = new Set(activityDates || []);

  // Generate last 24 weeks (168 days)
  const today = new Date();
  const activityDays = [];

  for (let i = 167; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    const dateString = [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, "0"),
      String(date.getDate()).padStart(2, "0"),
    ].join("-");

    activityDays.push({
      date: dateString,
      present: activitySet.has(dateString),
    });
  }

  // Calculate current consecutive-day streak
  let streak = 0;
  const checkDate = new Date(today);

  const formatDate = (date) =>
    [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, "0"),
      String(date.getDate()).padStart(2, "0"),
    ].join("-");

  // Allow the streak to start today or yesterday
  if (!activitySet.has(formatDate(checkDate))) {
    checkDate.setDate(checkDate.getDate() - 1);
  }

  while (activitySet.has(formatDate(checkDate))) {
    streak++;
    checkDate.setDate(checkDate.getDate() - 1);
  }

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-[#0f1220] p-6 text-white">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="text-lg font-bold">
          Activity — last 24 weeks
        </h2>

        <span className="whitespace-nowrap text-sm text-slate-400">
          🔥 {streak}-day streak
        </span>
      </div>

      {/* Activity Grid */}
      <div className="grid grid-flow-col grid-rows-7 gap-[3px] overflow-x-auto">
        {activityDays.map((day) => (
          <div
            key={day.date}
            title={`${day.date} — ${
              day.present ? "Present" : "Absent"
            }`}
            className={`h-3.5 w-3.5 shrink-0 rounded-[3px] transition-colors ${
              day.present ? "bg-green-500" : "bg-red-500"
            }`}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="mt-5 flex items-center justify-end gap-2 text-xs text-slate-500">
        <span>Absent</span>
        <div className="h-3 w-3 rounded-sm bg-red-500" />

        <span className="ml-2">Present</span>
        <div className="h-3 w-3 rounded-sm bg-green-500" />
      </div>
    </div>
  );
};

export default Activity;