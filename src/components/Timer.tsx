import { useState } from "react";
import { useTimer } from "react-timer-hook";

const OPTIONS = [5, 10, 15, 20, 30, 45];

function getExpiry(minutes: number) {
  const time = new Date();
  time.setMinutes(time.getMinutes() + minutes);
  return time;
}

export default function Timer() {
  const [selected, setSelected] = useState(15);

  const { minutes, seconds, isRunning, start, pause, restart } = useTimer({
    expiryTimestamp: getExpiry(selected),
    autoStart: false,
    onExpire: () => console.log("Finish"),
  });

  function selectTime(option: number) {
    setSelected(option);
    restart(getExpiry(option), false);
  }

  function reset() {
    restart(getExpiry(selected), false);
  }

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-4 py-10 sm:px-6">
      {/* Círculo decorativo */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2
        aspect-square w-[min(85vw,28rem)]
        -translate-x-1/2 -translate-y-1/2
        rounded-full border border-white/15"
      />

      {/* Contenido */}
      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center">
        {/* Título */}
        <p
          className="mb-4 text-center text-xs font-bold uppercase
          tracking-[0.15em] text-white/70
          sm:mb-5 sm:text-base sm:tracking-[0.2em]
          md:text-xl"
        >
          The clock is ticking
        </p>

        {/* Reloj */}
        <h1
          className="whitespace-nowrap text-center
          text-[clamp(4.5rem,17vw,11rem)]
          leading-none font-black tracking-wider text-white
          [text-shadow:0_10px_30px_rgba(0,0,0,0.15)]
          tabular-nums"
        >
          {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </h1>

        {/* Opciones de tiempo */}
        <div
          className="mt-4 grid w-full max-w-xl grid-cols-3 justify-items-center gap-3 sm:mt-6 sm:grid-cols-6 sm:gap-3">
          {OPTIONS.map((option) => (
            <button
              key={option}
              className={`btn-time w-full max-w-24 ${
                selected === option
                  ? "border-white/80 bg-white/50 shadow-md"
                  : ""
              }`}
              onClick={() => selectTime(option)}
              aria-pressed={selected === option}
            >
              {option}m
            </button>
          ))}
        </div>

        {/* Controles */}
        <div
          className="mt-3 flex w-full max-w-md
          items-center justify-center gap-3
          sm:mt-8 sm:gap-4"
        >
          <button
            className="resume-time flex-1"
            onClick={isRunning ? pause : start}
          >
            {isRunning ? "Stop" : "Start"}
          </button>

          <button className="reset-time flex-1" onClick={reset}>
            Reset
          </button>
        </div>
      </div>
    </main>
  );
}
