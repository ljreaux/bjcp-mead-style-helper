import { type ReactElement, useState } from "react";

export default function useSteps(steps: ReactElement[]) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  function goTo(index: number) {
    setCurrentStepIndex(index);
  }
  function next() {
    setCurrentStepIndex((prev) =>
      prev <= steps.length - 1 ? (prev += 1) : prev
    );
  }
  function back() {
    setCurrentStepIndex((prev) => (prev >= 0 ? (prev -= 1) : prev));
  }
  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    goTo,
    last: () => goTo(steps.length - 1),
    next,
    back,
    steps,
    isLast: currentStepIndex === steps.length - 1,
    isFirst: currentStepIndex === 0,
  };
}
