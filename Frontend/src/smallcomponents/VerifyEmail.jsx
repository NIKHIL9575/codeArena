import { useRef, useState, useEffect } from "react";
import { Mail, X, ArrowRight, Pencil } from "lucide-react";

const VerifyEmail = ({ email, onClose, onVerify, onResend }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(45);
  const [loading, setLoading] = useState(false);
  const inputsRef = useRef([]);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pasted) return;

    setOtp(pasted.split("").concat(Array(6).fill("")).slice(0, 6));

    inputsRef.current[Math.min(pasted.length, 5)]?.focus();
  };

  const handleVerify = async (e) => {
    e.preventDefault();

    const code = otp.join("");

    if (code.length !== 6) return;

    try {
      setLoading(true);
      await onVerify(code);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (timeLeft > 0 || loading) return;

    try {
      setLoading(true);
      await onResend();
      setOtp(["", "", "", "", "", ""]);
      setTimeLeft(45);
      inputsRef.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-xl rounded-2xl border border-violet-500/70 bg-[#080e20] px-6 py-10 shadow-[0_0_60px_rgba(99,50,255,0.2)] sm:px-12">

        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 text-gray-400 transition hover:text-white"
          aria-label="Close verification modal"
        >
          <X size={24} />
        </button>

        {/* Email icon */}
        <div className="mx-auto mb-7 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-600/30 to-blue-500/20">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-violet-400 shadow-[0_0_25px_rgba(124,58,237,0.4)]">
            <Mail size={34} className="text-violet-300" />
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-center text-2xl font-bold text-white sm:text-3xl">
          <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
            Verify
          </span>{" "}
          your email address
        </h2>

        <p className="mt-4 text-center leading-7 text-gray-400">
          We've sent a 6-digit verification code to
          <br />
          <span className="break-all font-semibold text-sky-400">
            {email}
          </span>
        </p>

        {/* OTP form */}
        <form onSubmit={handleVerify}>
          <div className="mt-8 flex justify-center gap-2 sm:gap-3 max-sm:gap-1">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputsRef.current[index] = el)}
                type="text"
                inputMode="numeric"
                autoComplete={index === 0 ? "one-time-code" : "off"}
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                aria-label={`OTP digit ${index + 1}`}
                className="h-12 w-10 rounded-xl border border-slate-700 bg-[#10182b] text-center text-xl font-bold text-white outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30 sm:h-[68px] sm:w-[68px] max-sm:h-10 max-sm:w-8"
              />
            ))}
          </div>

          {/* Verify button */}
          <button
            type="submit"
            disabled={otp.join("").length !== 6 || loading}
            className="mt-7 flex w-full items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-violet-600 to-blue-500 py-4 font-bold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Please wait..." : "Verify Email"}
            {!loading && <ArrowRight size={20} />}
          </button>
        </form>

        {/* Resend OTP */}
        <p className="mt-6 text-center text-sm text-gray-400">
          Didn't receive the code?{" "}
          <button
            type="button"
            disabled={timeLeft > 0 || loading}
            onClick={handleResend}
            className="font-semibold text-violet-400 transition hover:text-violet-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Resend OTP
          </button>
        </p>

        <p className="mt-2 text-center text-sm text-gray-500">
          {timeLeft > 0
            ? `Resend available in 00:${String(timeLeft).padStart(2, "0")}`
            : "You can request a new code now."}
        </p>

        {/* Change email */}
        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-slate-700" />
          <span className="text-sm text-gray-500">OR</span>
          <div className="h-px flex-1 bg-slate-700" />
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mx-auto flex items-center gap-3 rounded-lg border border-slate-700 bg-slate-800/60 px-6 py-3 text-sm text-gray-200 transition hover:border-violet-500 hover:bg-slate-800"
        >
          <Pencil size={17} />
          Use a different email
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;