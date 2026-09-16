import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import { PauseIcon } from "lucide-react";

function StartIcon({ size = 24, color = "#2563eb", ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M6 4L20 12L6 20V4Z" />
    </svg>
  );
}
function StopIcon({ size = 24, color = "#2563eb", ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="6" y="6" width="12" height="12" rx="2" />
    </svg>
  );
}

function ResumeIcon({ size = 24, color = "#2563eb", ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M5 4L15 12L5 20V4Z" />
      <rect x="17" y="4" width="2" height="16" rx="1" />
    </svg>
  );
}

function ResetIcon({ size = 24, color = "#2563eb", ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  );
}

function FlagIcon({ size = 24, color = "#2563eb", ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" y1="22" x2="4" y2="15" />
    </svg>
  );
}

function RunningClock({ startpoint }) {
  let st = Date.now() - startpoint;
  let sec:number|string = Math.floor(st / 1000) % 60;
  let min:number|string = Math.floor((st/1000) / 60) % 60;
  if (sec < 10) {
    sec = "0" + String(sec);
  }
  if (min < 10) {
    min = "0" + String(min);
  }
  return `${min}:${sec}:${st % 1000}`;
}

export default function App() {
  const [startpoint, setStartpoint] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [keepRunning, setKeepRunning] = useState(0);
  const [stoppoint, setStoppoint] = useState(0);
  const [timestamp, setTimestamp] = useState([]);
  useEffect(() => {
    let Intervalid;
    if (isRunning) {
      Intervalid = setInterval(() => {
        let newval = startpoint - Date.now();
        setKeepRunning(newval);
      }, 10);
    }
    return () => {
      clearInterval(Intervalid);
    };
  }, [isRunning]);
  return (
    <div>
      <div className="navbar flex justify-center items-center">
        <div className="main-heading text-[25px] font-light">STOP WATCH</div>
      </div>
      <div className="time-frame-container flex justify-center items-center mt-5">
        <div className="time-frame text-[80px] font-light w-[300px] h-[60px] ml-[40px]">
          {!startpoint ? "00:00:00" : <RunningClock startpoint={startpoint} />}
        </div>
      </div>
        <div className="timestamp-container">{timestamp && timestamp.map((item,index) => {
          return <div key={index}className="flex justify-between w-[200px] py-1 border-b border-gray-200 text-sm"><span>Lap {index + 1}</span>
          <span>{item}</span></div>;
        })}</div>
      <div className="button-frame flex justify-center gap-3.5 absolute bottom-[26px] right-[50%]">
        {!startpoint ? (
          <Button
            onClick={() => {
              setStartpoint(Date.now());
              setIsRunning(true);
            }}
          >
            <StartIcon />
          </Button>
        ) : (
          <>
            {isRunning ? (
              <Button
                onClick={() => {
                  let st = Date.now() - startpoint;
                  let sec:number|string= Math.floor(st / 1000) % 60;
                  let min :number|string= Math.floor((st/1000) / 60) % 60;
                  if (sec < 10) {
                    sec = "0" + String(sec);
                  }
                  if (min < 10) {
                    min = "0" + String(min);
                  }
                  setTimestamp([...timestamp,`${min}:${sec}:${st % 1000}`])
                }}
              >
                <FlagIcon />
              </Button>
            ) : (
              <Button
                onClick={() => {
                  setStartpoint(0);
                  setTimestamp([]);
                }}
              >
                <StopIcon />
              </Button>
            )}
            {!isRunning ? (
              <Button
                onClick={() => {
                  setStartpoint((prev) => prev + Date.now() - stoppoint);
                  setIsRunning(true);
                }}
              >
                <ResumeIcon />
              </Button>
            ) : (
              <Button
                onClick={() => {
                  setIsRunning(false);
                  setStoppoint(Date.now());
                }}
              >
                <PauseIcon />
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
