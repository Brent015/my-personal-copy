import { useState, useEffect } from "react";
import { sampleSchedules, Schedule } from "./types";

export const useSchedules = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSchedules = async () => {
      try {
        setLoading(true);
        // const data = await fetchSchedules();
        setSchedules(sampleSchedules);
        setError(null);
      } catch (err) {
        setError("Failed to fetch schedules");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadSchedules();
  }, []);

  return { schedules, loading, error };
};
