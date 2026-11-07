import { useState } from "react";
import { ChevronDown, Lightbulb } from "lucide-react";

const Hint = ({ data }) => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="w-full space-y-3 px-4 py-6">

   <h1>A nudge,not a spoiler.</h1>
   <p>Build your intuition before jumping into an implementation. Reveal each step when you’re ready</p>

      {data?.hints?.map((hint, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={index}
            className={`overflow-hidden rounded-lg border transition-all duration-300 ${
              isOpen
                ? "border-purple-400/40 bg-white/[0.03]"
                : "border-white/10"
            }`}
          >
            {/* Accordion Header */}
            <button
              onClick={() =>
                setOpenIndex(isOpen ? null : index)
              }
              className={`flex w-full items-center gap-3 px-4 py-4 text-left transition-colors ${
                isOpen ? "bg-white/[0.04]" : "hover:bg-white/[0.03]"
              }`}
            >
              <Lightbulb
                className={`h-5 w-5 shrink-0 ${
                  isOpen ? "text-purple-400" : "text-gray-400"
                }`}
              />

              <span className="flex-1 font-medium text-white">
                Hint {index + 1}
              </span>

              <span className="text-xs text-gray-500">
                STEP {String(index + 1).padStart(2, "0")}
              </span>

              <ChevronDown
                className={`h-4 w-4 text-gray-400 transition-transform duration-300 ${
                  isOpen ? "rotate-180 text-purple-400" : ""
                }`}
              />
            </button>

            {/* Accordion Content */}
            <div
              className={`grid transition-all duration-300 ease-in-out ${
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="border-t border-white/10 border-l-2 border-l-purple-400 px-4 py-4 pl-5 text-sm leading-7 text-gray-300 whitespace-pre-wrap break-words">
                  {typeof hint === "string"
                    ? hint
                    : hint?.hint ?? hint?.text ?? hint?.content ?? ""}
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <p>Try implementing your approach, then run the sample tests.</p>
    </div>
  );
};

export default Hint;