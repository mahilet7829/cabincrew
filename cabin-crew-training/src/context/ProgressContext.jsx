import { createContext, useState, useEffect } from "react";
import { loadProgress, saveProgress } from "../utils/storage";

export const ProgressContext = createContext();

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState(loadProgress());

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  function completeLesson(moduleId, lessonId) {
    setProgress((prev) => {
      const moduleProgress = prev[moduleId] || { lessons: [], quizScores: {} };
      if (!moduleProgress.lessons.includes(lessonId)) {
        moduleProgress.lessons = [...moduleProgress.lessons, lessonId];
      }
      return { ...prev, [moduleId]: moduleProgress };
    });
  }

  function saveQuizScore(moduleId, score, total) {
    setProgress((prev) => {
      const moduleProgress = prev[moduleId] || { lessons: [], quizScores: {} };
      moduleProgress.quizScores = { ...moduleProgress.quizScores, latest: { score, total } };
      return { ...prev, [moduleId]: moduleProgress };
    });
  }

  return (
    <ProgressContext.Provider value={{ progress, completeLesson, saveQuizScore }}>
      {children}
    </ProgressContext.Provider>
  );
}