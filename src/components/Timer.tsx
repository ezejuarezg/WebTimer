import { useState } from 'react';
import { useTimer } from 'react-timer-hook';

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
    onExpire: () => console.log('Finish'),
  });

  function selectTime(option: number) {
    setSelected(option);
    restart(getExpiry(option), false);
  }

  function reset() {
    restart(getExpiry(selected), false);
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-[#edbb45] px-8 py-16">
      <div className="pointer-events-none absolute top-1/2 left-1/2 size-28rem -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15"></div>

      <p className="relative mb-4 text-xl font-bold tracking-[0.2em] text-white/70 uppercase">
        The clock is ticking
      </p>

      <h1 className="relative text-[10rem] leading-none font-black tracking-tight text-white [text-shadow:0_10px_30px_rgba(0,0,0,0.15)]">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </h1>


      <div className="relative mt-10 flex items-center justify-center gap-3">
        {OPTIONS.map((option) => (
          <button
            key={option}
            className="btn-time"
            onClick={() => selectTime(option)}
          >
            {option}m
          </button>
        ))}
      </div>

      <div className="relative mt-8 flex gap-3">
        <button className="resume-time" onClick={isRunning ? pause : start}>
          {isRunning ? 'Stop' : 'Start' }
        </button>
        <button className="reset-time" onClick={reset}>
          Reset
        </button>
      </div>

    </div>
  );
}