import { useMeadStyle } from "@/hooks/useMeadStyle";
import { useState } from "react";
import { useIngredients } from "@/hooks/useIngredients";
import { SweetnessLevelSelect } from "./SweetnessLevelSelect";
import { CarbonationLevelSelect } from "./CarbonationLevelSelect";
import { HoneyVarietalLine } from "./HoneyVarietalLine";
import { ListItem } from "./ListItem";
import { CheckBoxGroup } from "./CheckBoxGroup";
import { EditableTextArea } from "./EditableTextArea";
import { Warning } from "./Warning";
import { categoryMap } from "@/assets/categoryMap";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Info } from "lucide-react";
import { capitalize } from "lodash";
import StrengthLevelSelect from "./StrengthLevelSelect";
import { Skeleton } from "./ui/skeleton";

export const InfoPage = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Instructions</CardTitle>
      </CardHeader>

      <CardContent className="space-y-8 text-base leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-primary mb-2">
            Step 1: Answer the Questions
          </h2>
          <p>
            Begin by selecting what applies to your mead: whether it contains
            fruit, spices, specialty ingredients, or fits into a historical or
            braggot category. These questions help determine the correct style
            classification.
          </p>
        </section>

        <Separator />

        <section>
          <h2 className="text-xl font-semibold text-primary mb-2">
            Step 2: Add Your Ingredients
          </h2>
          <p>
            You’ll then select your ingredients from categorized lists. For best
            results, choose ingredients from the suggestions provided. There is
            no need to include things like nutrients, tannins, or oak (unless
            its spirit soaked).
          </p>

          <Alert className="mt-4">
            <Info className="h-4 w-4" />
            <AlertTitle className="font-semibold">Tip</AlertTitle>
            <AlertDescription className="flex">
              If your ingredient isn’t listed — like black raspberry — select
              the closest match (e.g., raspberry) and adjust the description
              later.
            </AlertDescription>
          </Alert>
        </section>

        <Separator />

        <section>
          <h2 className="text-xl font-semibold text-primary mb-2">
            Step 3: Review Your Style Category
          </h2>
          <p>
            The final page will show the suggested BJCP category with a direct
            link and its official description. You’ll also see the required and
            optional information for that style based on the ingredients you
            provided.
          </p>
          <Alert className="mt-4" variant="warning">
            <Info className="h-4 w-4" />
            <AlertTitle className="font-semibold">Note</AlertTitle>
            <AlertDescription>
              If you edit the optional or required info fields, they will stop
              updating automatically when you change ingredients.
            </AlertDescription>
          </Alert>
        </section>

        <Separator />

        <section>
          <p>
            When you're finished, you’ll have a judge-friendly,
            competition-ready summary of your mead style — complete with a BJCP
            link and formatted entry information.
          </p>
        </section>
      </CardContent>
    </Card>
  );
};

export const PageOne = () => {
  const {
    isTraditional,
    toggleTraditional,
    isMelomel,
    toggleMelomel,
    isMetheglin,
    toggleMetheglin,
    isSpecialty,
    toggleSpecialty,
    isBraggot,
    toggleBraggot,
    isHistorical,
    toggleHistorical,
  } = useMeadStyle();

  const othersChecked =
    isMelomel || isMetheglin || isSpecialty || isBraggot || isHistorical;

  return (
    <div className="grid gap-2">
      <ListItem
        id="q-one"
        isChecked={isTraditional}
        checkChange={toggleTraditional}
        label="Mead contains no fruit, spices, or other flavor ingredients — only
            honey, water, and yeast (excluding allowed fermentation aids and
            oak)."
        disabled={othersChecked}
      />
      <ListItem
        id="q-two"
        isChecked={isMelomel}
        checkChange={toggleMelomel}
        label="Includes fruit or fruit juice (before, during, or after fermentation)"
        disabled={isTraditional}
      />
      <ListItem
        id="q-three"
        isChecked={isMetheglin}
        checkChange={toggleMetheglin}
        label="Includes spices, herbs, or vegetables"
        disabled={isTraditional}
        tooltipText="Includes any culinary spice, herb, or vegetable used for flavor — such as roses, rose hips, ginger, rhubarb, pumpkin, chile peppers, coffee, chocolate, nuts (including coconut), citrus peel or zest, and tea (used for flavor, not just tannin). If you have to say 'technically,' it probably doesn’t count."
      />
      <ListItem
        id="q-four"
        isChecked={isSpecialty}
        checkChange={toggleSpecialty}
        label="Contains bocheted honey, spirit soaked oak, or uses any unusual processes or alternative sugars"
        disabled={false}
        tooltipText="Includes unusual fermentables (like maple syrup, molasses, brown sugar, or agave), added ingredients (such as liquor or smoke), non-traditional yeasts (like Brett, lambic, or Belgian strains), or special processes (like icing). Oak alone isn’t enough — unless the barrel adds flavor, like bourbon."
      />
      <ListItem
        id="q-five"
        isChecked={isBraggot}
        checkChange={toggleBraggot}
        label="Includes malt, beer, or other ingredients from a braggot-style base"
        disabled={isTraditional}
        tooltipText="Check this if your mead uses malt, beer, or ingredients common in beer — like grains, wort, or hops — even in small amounts. This may qualify as a braggot-style specialty mead."
      />
      <ListItem
        id="q-six"
        isChecked={isHistorical}
        checkChange={toggleHistorical}
        label="Based on a historical or traditional recipe or technique"
        disabled={isTraditional}
        tooltipText="Check this if your mead is based on a specific historical style or old-world method — like Polish meads, Gruit-inspired herbal meads, or documented cultural traditions."
      />
    </div>
  );
};

export const PageTwo = () => {
  const { data, isLoading, error } = useIngredients();
  const {
    selectedIngredients,
    setSelectedIngredients,
    isTraditional,
    warning,
  } = useMeadStyle();

  if (isLoading)
    return (
      <div className="flex flex-col gap-2 py-6">
        {/* Sweetness, Carbonation, Strength selects */}
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex gap-2 items-center">
            <Skeleton className="h-5 w-40" /> {/* Label */}
            <Skeleton className="h-10 w-[200px] rounded-md" />{" "}
            {/* SelectTrigger */}
          </div>
        ))}

        {/* HoneyVarietalLine, assume full-width input or similar */}
        <Skeleton className="h-10 w-full max-w-md rounded-md mt-2" />

        {/* Checkbox group mimic */}
        <div className="grid py-2 gap-2">
          <div className="flex gap-4">
            <Skeleton className="h-10 w-full max-w-[320px] rounded-md" />
            <Skeleton className="h-10 w-[200px] rounded-md" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 h-64 overflow-y-auto p-6 border rounded-md">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded-sm" />
                <Skeleton className="h-4 w-24" />
              </div>
            ))}
          </div>

          {/* Custom Ingredient Add section */}
          <div className="flex gap-4 items-center">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-10 w-36 rounded-md" />
            <Skeleton className="h-10 w-20 rounded-md" />
          </div>
        </div>
      </div>
    );
  if (error) return <p>Error loading ingredients</p>;
  return (
    <div>
      <div className="flex flex-col gap-2 py-6">
        <SweetnessLevelSelect />
        <CarbonationLevelSelect />
        <StrengthLevelSelect />
        <HoneyVarietalLine />
      </div>
      {!isTraditional && (
        <CheckBoxGroup
          boxes={data}
          selected={selectedIngredients}
          setSelected={setSelectedIngredients}
          label="Ingredients"
        />
      )}
      {warning && (
        <Warning
          title="There is a problem with one of your Ingredients."
          message={warning}
        />
      )}
    </div>
  );
};

export const Results = () => {
  const {
    category,
    requiredInfo,
    optionalInfo,
    updateRequiredInfo,
    updateOptionalInfo,
    edited,
    carbonationLevel,
    sweetnessLevel,
    strengthLevel,
  } = useMeadStyle();
  const [disabledObj, setDisabledObj] = useState({
    required: true,
    optional: true,
  });

  if (!category) return null;

  const categoryInfo = categoryMap[category.category];
  return (
    <>
      {category && (
        <div className="space-y-6">
          {/* Category Title Link */}
          <div>
            <a
              className="text-3xl font-bold underline hover:text-foreground/75 transition-opacity duration-200"
              href={category.link}
              target="_blank"
            >
              {categoryInfo?.title}
            </a>
            <p className="text-muted-foreground text-sm mt-1">
              Click the title to view the official BJCP style guidelines.
            </p>
          </div>

          <Separator />

          {/* Description Section */}
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Category Description</h2>
            <p className="text-muted-foreground">{categoryInfo?.description}</p>
          </div>

          <Separator />

          {/* Quick Style Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <p>
              <span className="font-semibold">Carbonation:</span>{" "}
              {capitalize(carbonationLevel)}
            </p>
            <p>
              <span className="font-semibold">Sweetness:</span>{" "}
              {capitalize(sweetnessLevel)}
            </p>
            <p>
              <span className="font-semibold">Strength:</span>{" "}
              {capitalize(strengthLevel)}
            </p>
          </div>

          <Separator />

          {/* Required Info */}
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Required Info</h2>
            <EditableTextArea
              label=""
              value={requiredInfo}
              disabled={disabledObj.required}
              handleChange={updateRequiredInfo}
              toggleDisabled={() =>
                setDisabledObj((prev) => ({
                  ...prev,
                  required: !prev.required,
                }))
              }
            />
          </div>

          <Separator />

          {/* Optional Info */}
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Optional Info</h2>
            <EditableTextArea
              label=""
              value={optionalInfo}
              disabled={disabledObj.optional}
              handleChange={updateOptionalInfo}
              toggleDisabled={() =>
                setDisabledObj((prev) => ({
                  ...prev,
                  optional: !prev.optional,
                }))
              }
            />
          </div>

          {/* Warning Message */}
          {edited && (
            <Warning
              title="One of these fields has been edited."
              message="The required info and optional info on this page will no longer automatically update."
            />
          )}
        </div>
      )}
    </>
  );
};
