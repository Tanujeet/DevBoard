import { usePomodoroTimer } from "@/lib/utils";
import { axiosInstance } from "@/lib/axios";
import { useEffect } from "react";

const PomodoroWidget = () => {
  const {
    formattedTime,
    isRunning,
    isComplete,
    start,
    pause,
    reset,
    startTime,
  } = usePomodoroTimer(25); // 25 minutes

  // ✅ Automatically save to backend on complete
  useEffect(() => {
    const handlePomodoroComplete = async () => {
      try {
        await axiosInstance.post("/pomodoro", {
          duration: 25,
          taskId: null, // Replace with actual taskId if needed
        });
        console.log("Pomodoro session stored");
      } catch (err) {
        console.error("Failed to save pomodoro", err);
      }
    };

    if (isComplete && startTime) {
      handlePomodoroComplete();
    }
  }, [isComplete, startTime]);

  return (
    <section className="bg-muted/50 rounded-xl p-6 shadow w-full md:max-w-md">
      <h3 className="text-lg font-semibold mb-2">Focus Timer</h3>
      <div className="flex items-center justify-between">
        <div className="text-4xl font-bold">{formattedTime}</div>
        <button
          onClick={isRunning ? pause : start}
          className="text-primary hover:scale-110 transition"
        >
          Start / Pause
        </button>
      </div>
      <div className="flex gap-2 mt-4">
        <button
          onClick={reset}
          className="text-xs border px-3 py-1 rounded hover:bg-muted"
        >
          Reset
        </button>
        {isComplete && (
          <p className="text-green-500 text-sm font-medium">
            Session Complete!
          </p>
        )}
      </div>
    </section>
  );
};

export default PomodoroWidget;
