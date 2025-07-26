// import { useQuery } from "@tanstack/react-query";
import useSteps from "@/hooks/useSteps";
import { Results, PageOne, PageTwo, InfoPage } from "./questions";
import { Button } from "./ui/button";
import { useMeadStyle } from "@/hooks/useMeadStyle";
import { ModeToggle } from "./mode-toggle";

const stepConfig = [
  {
    key: "Card 0",
    components: [<InfoPage />],
  },
  {
    key: "Card 1",
    components: [<PageOne />],
  },
  {
    key: "Card 2",
    components: [<PageTwo />],
  },
  {
    key: "Results Card",
    components: [<Results />],
  },
];

function Main() {
  const {
    isMelomel,
    isTraditional,
    isMetheglin,
    isSpecialty,
    isBraggot,
    isHistorical,
  } = useMeadStyle();

  const steps = stepConfig.map(({ key, components }) => (
    <div key={key}>{components}</div>
  ));

  const { step, next, back, isLast, isFirst, currentStepIndex } =
    useSteps(steps);

  const categoryDefined =
    isTraditional ||
    isMelomel ||
    isMetheglin ||
    isSpecialty ||
    isBraggot ||
    isHistorical;

  const isInfoPage = currentStepIndex === 0;
  const isQuestionsPage = currentStepIndex === 1;

  const canGoNext =
    isInfoPage || // always allow
    (isQuestionsPage && categoryDefined) || // allow if category chosen
    (!isInfoPage && !isQuestionsPage && !isLast); // allow all middle pages

  return (
    <main className="p-4 flex flex-col gap-4">
      <header className="w-full flex justify-between">
        <h1 className="text-4xl font-bold">BJCP Mead Style Helper</h1>
        <ModeToggle />
      </header>
      {step}
      <div className="flex gap-4 py-4">
        <Button onClick={back} disabled={isFirst}>
          Back
        </Button>
        <Button onClick={next} disabled={!canGoNext}>
          Next
        </Button>
      </div>
    </main>
  );
}

export default Main;
