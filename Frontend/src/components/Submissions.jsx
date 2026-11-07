import React, { useState, useEffect } from "react";
import {
  CodeXml,
  ChevronRight,
  SearchCode,
} from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import submissionsChar from "../assets/submissionsChar.png";

const Submissions = () => {
  const [search, setSearch] = useState("");
  const [slide, setSlide] = useState("All");
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  const slidesButton = [
    { id: 1, item: "All" },
    { id: 2, item: "Accepted" },
    { id: 3, item: "Needs work" },
  ];

  // Fetch submissions when the page opens
  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          "http://localhost:8000/api/submissions",
          { withCredentials: true }
        );
        
        console.log(response?.data?.result);
        setSubmissions(response.data.result || []);
      } catch (error) {
        console.error(
          "Failed to fetch submissions:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  // Filter submissions by search and selected verdict
  const filteredSubmissions = submissions.filter((submission) => {
    const matchesSearch =
      submission.problemId?.title
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      submission.language
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchesFilter =
      slide === "All" ||
      (slide === "Accepted" && submission.status === "Accepted") ||
      (slide === "Needs work" && submission.status !== "Accepted");

    return matchesSearch && matchesFilter;
  });

  // Statistics
  const totalAttempts = submissions.length;

  const acceptedCount = submissions.filter(
    (submission) => submission.status === "Accepted"
  ).length;

  const acceptanceRate =
    totalAttempts > 0
      ? Math.round((acceptedCount / totalAttempts) * 100)
      : 0;

  const languagesCount = new Set(
    submissions.map((submission) => submission.language)
  ).size;

  // Verdict colors
  const getVerdictColor = (status) => {
    if (status === "Accepted") {
      return "text-emerald-400";
    }

    if (status === "Time Limit" || status === "Time Limit Exceeded") {
      return "text-amber-400";
    }

    return "text-red-400";
  };

  const getVerdictDot = (status) => {
    if (status === "Accepted") {
      return "bg-emerald-400";
    }

    if (status === "Time Limit" || status === "Time Limit Exceeded") {
      return "bg-amber-400";
    }

    return "bg-red-400";
  };

  const getDifficultyStyle = (difficulty) => {
    if (difficulty === "Hard") {
      return "text-red-400 border-red-500/30 bg-red-500/10";
    }

    if (difficulty === "Medium") {
      return "text-amber-400 border-amber-500/30 bg-amber-500/10";
    }

    return "text-emerald-400 border-emerald-500/30 bg-emerald-500/10";
  };

  return (
    <div className="bg-page absolute top-0 w-screen min-h-screen flex flex-col overflow-x-hidden p-2 gap-4 max-lg:relative max-lg:top-auto max-lg:w-full">
      {/* Heading */}
      <div
        className="upper text-text w-full
        bg-[radial-gradient(ellipse_90%_100%_at_50%_0%,rgba(34,197,94,0.16)_0%,rgba(34,197,94,0.07)_40%,transparent_100%)]
        pointer-events-none pt-32 pl-16 max-lg:pt-28 max-lg:pl-4 max-lg:pr-4 max-lg:pb-6"
      >
        <div className="border-t-green-600 bg-green-600/10 border-t-4 flex flex-col gap-3 w-7xl pl-5 pt-5 pb-4 max-lg:w-full max-lg:pl-4 max-sm:px-3">
          <h1 className="text-[#0BDA73] font-Alumni text-2xl font-semibold">
            YOUR CODE TRAIL
          </h1>

          <h2 className="text-text font-Saira font-semibold relative text-5xl w-fit max-sm:text-4xl">
            All Submissions

            <img
              className="absolute left-[76%] bottom-1 w-12 h-auto object-contain"
              src={submissionsChar}
              alt=""
            />
          </h2>

          <p className="text-text/80">
            Every attempt tells part of the story. Review what passed,
            revisit what didn't, and keep moving.
          </p>
        </div>
      </div>

      {/* Statistics cards */}
      <div className="mid w-full">
        <div className="centre w-[89%] flex gap-3 pl-16 max-lg:w-full max-lg:pl-0 max-lg:flex-wrap max-sm:grid max-sm:grid-cols-1">
          <div className="first flex flex-col flex-1 mt-8 border-2 border-border bg-section p-3 rounded-lg">
            <h1 className="text-text/60">Total attempts</h1>
            <h1 className="text-4xl text-text">{totalAttempts}</h1>
            <p className="text-text/50">
              Across your practice history
            </p>
          </div>

          <div className="first flex flex-col flex-1 mt-8 border-2 border-border bg-section p-3 rounded-lg">
            <h1 className="text-text/60">Accepted</h1>
            <h1 className="text-4xl text-text">{acceptedCount}</h1>
            <p className="text-text/50">
              {acceptanceRate}% acceptance rate
            </p>
          </div>

          <div className="first flex flex-col flex-1 mt-8 border-2 border-border bg-section p-3 rounded-lg">
            <h1 className="text-text/60">Languages used</h1>
            <h1 className="text-4xl text-text">{languagesCount}</h1>
            <p className="text-text/50">
              Keep exploring different tools
            </p>
          </div>
        </div>
      </div>

      <div className="line bg-border border border-border" />

      {/* Submissions table */}
      <div className="bottom w-full pb-8">
        <div className="main w-[85%] ml-16 border border-border rounded-xl overflow-hidden bg-section max-lg:w-full max-lg:ml-0">
          {/* Search and filters */}
          <div className="top p-3 w-full bg-section flex items-center justify-between gap-4 max-lg:flex-col max-lg:items-stretch">
            <div className="flex items-center gap-3 border border-border rounded-lg px-3 focus-within:border-violet-500 transition-all duration-300 w-96 h-10 bg-page max-lg:w-full">
              <CodeXml className="text-text" size={20} />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search problem or language..."
                className="w-full bg-transparent outline-none text-text"
              />
            </div>

            <div className="slides bg-page border border-border w-64 h-10 rounded-md p-1 flex items-center justify-center max-lg:w-full max-lg:max-w-96">
              {slidesButton.map((item) => (
                <div
                  onClick={() => setSlide(item.item)}
                  key={item.id}
                  className="button relative p-2 flex-1 h-full flex items-center justify-center cursor-pointer"
                >
                  <h1
                    className={`absolute z-10 transition-all text-sm ${
                      item.item === slide
                        ? "text-text"
                        : "text-text/50"
                    }`}
                  >
                    {item.item}
                  </h1>

                  {item.item === slide && (
                    <motion.span
                      layoutId="slide"
                      className="absolute inset-0 rounded-md bg-violet-500/30"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Table headings */}
          <div className="hidden lg:grid grid-cols-[minmax(300px,2fr)_140px_160px_120px_150px_24px] gap-5 border-y border-border px-6 py-4 font-mono text-xs uppercase tracking-wider text-text/50">
            <span>Problem</span>
            <span>Language</span>
            <span>Verdict</span>
            <span>Runtime</span>
            <span>Submitted</span>
            <span></span>
          </div>

          {/* Loading skeleton */}
          {loading && (
            <div className="p-5 flex flex-col gap-3">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-16 rounded-lg bg-page animate-pulse"
                />
              ))}
            </div>
          )}

          {/* Submission rows */}
          {!loading &&
            filteredSubmissions.map((submission, index) => {
              const status = submission.status || "Pending";
              const problem = submission;

              return (
                <div
                  key={submission._id || index}
                     onClick={() => setSelectedSubmission(submission)}
                  className="grid grid-cols-1 lg:grid-cols-[minmax(300px,2fr)_140px_160px_120px_150px_24px] gap-3 lg:gap-5 px-6 py-5 border-b border-border items-center hover:bg-page/60 transition-colors cursor-pointer max-sm:px-4"
                >
                  {/* Problem */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 shrink-0 rounded-lg bg-page flex items-center justify-center font-mono text-xs text-text/60">
                      {String(
                        problem?.problemNumber ?? index + 1
                      ).padStart(2, "0")}
                    </div>

                    <div className="flex flex-wrap items-center gap-2 min-w-0">
                      <h2 className="text-text font-semibold">
                        {problem?.title || "Unknown problem"}
                      </h2>

                      {problem?.difficulty && (
                        <span
                          className={`text-xs px-2.5 py-1 rounded-lg border ${getDifficultyStyle(
                            problem.difficulty
                          )}`}
                        >
                          {problem.difficulty}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Language */}
                  <div className="flex items-center gap-2 text-sm text-text/70">
                    <span className="lg:hidden text-text/40">
                      Language:
                    </span>

                    <span className="flex items-center gap-2 rounded-lg border border-border bg-page px-3 py-2">
                      <CodeXml
                        size={14}
                        className="text-violet-400"
                      />
                      {submission.language}
                    </span>
                  </div>

                  {/* Verdict */}
                  <div
                    className={`flex items-center gap-2 font-mono text-sm font-semibold ${getVerdictColor(
                      status
                    )}`}
                  >
                    <span className="lg:hidden text-text/40">
                      Verdict:
                    </span>

                    <span
                      className={`w-2 h-2 rounded-full ${getVerdictDot(
                        status
                      )}`}
                    />

                    {status}
                  </div>

                  {/* Runtime */}
                  <div className="font-mono text-sm text-text/60">
                    <span className="lg:hidden text-text/40">
                      Runtime:{" "}
                    </span>

                    {submission.executionTime != null
                      ? `${submission.executionTime}ms`
                      : "—"}
                  </div>

                  {/* Submission date */}
                  <div className="font-mono text-sm text-text/60">
                    <span className="lg:hidden text-text/40">
                      Submitted:{" "}
                    </span>

                    {submission.submittedAt
                      ? new Date(
                          submission.submittedAt
                        ).toLocaleDateString()
                      : "—"}
                  </div>

                  <ChevronRight
                    size={18}
                    className="hidden lg:block text-text/40"
                  />
                </div>
              );
            })}

          {/* Empty state */}
          {!loading && filteredSubmissions.length === 0 && (
            <div className="py-16 text-center text-text/50">
              {submissions.length === 0
                ? "No submissions yet. Start solving problems!"
                : "No submissions match your search or filter."}
            </div>
          )}

          {/* Footer */}
          {!loading && (
            <div className="flex flex-col sm:flex-row justify-between gap-3 px-6 py-4 text-xs font-mono text-text/50">
              <span>
                Showing {filteredSubmissions.length} of{" "}
                {submissions.length} submissions
              </span>

              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Your submissions appear here
              </span>
            </div>
          )}
        </div>
      </div>

      {selectedSubmission && (
        <div
          onClick={() => setSelectedSubmission(null)}
          className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-md flex items-center justify-center p-5"
        >

          {/* Modal */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl max-h-[85vh] bg-[#0d111c] border border-violet-500/40 rounded-xl shadow-2xl flex flex-col overflow-hidden max-sm:max-h-[90vh]"
          >

            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-border max-sm:px-4">

              <div>
                <h2 className="text-text text-xl font-semibold">
                  {selectedSubmission.title || selectedSubmission.problemTitle || "Submission Code"}
                </h2>

                <p className="text-text/40 text-sm mt-1">
                  {selectedSubmission.language?.toUpperCase()} · {selectedSubmission.status}
                </p>
              </div>

              <button
                onClick={() => setSelectedSubmission(null)}
                className="text-text/50 hover:text-red-500 text-2xl"
              >
                &times;
              </button>

            </div>

            {/* Code */}
            <div className="p-5 overflow-auto flex-1 max-sm:p-3">

              <textarea
                readOnly
                value={selectedSubmission.code || ""}
                className="w-full min-h-[400px] resize-none bg-[#080b14] text-green-400 font-mono text-sm p-5 rounded-lg border border-border outline-none"
              />

            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 px-6 py-4 border-t border-border">

              <button
                onClick={() => {
                  navigator.clipboard.writeText(selectedSubmission.code || "");
                }}
                className="px-5 py-2 rounded-lg bg-violet-600/20 border border-violet-600 text-violet-500 hover:bg-white cursor-pointer"
              >
                Copy Code
              </button>

              <button
                onClick={() => setSelectedSubmission(null)}
                className="px-5 py-2 rounded-lg bg-red-500 hover:bg-white hover:text-red-600 cursor-pointer text-white "
              >
                Close
              </button>

            </div>

          </div>
        </div>
      )}



    </div>
  );
};

export default Submissions;