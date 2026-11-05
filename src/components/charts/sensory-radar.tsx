
"use client";

import { ResponsiveRadar } from "@nivo/radar";

const sample = [
  { taste: "Acidity", score: 7 },
  { taste: "Sweetness", score: 8 },
  { taste: "Bitterness", score: 3 },
  { taste: "Body", score: 7 },
  { taste: "Clarity", score: 8 },
  { taste: "Balance", score: 8 },
  { taste: "Aftertaste", score: 7 },
];

export function SensoryRadar() {
  return (
    <div className="radar-wrap">
      <ResponsiveRadar
        data={sample}
        keys={["score"]}
        indexBy="taste"
        maxValue={10}
        margin={{ top: 30, right: 50, bottom: 30, left: 50 }}
        curve="linearClosed"
        gridLevels={5}
        gridLabelOffset={20}
        enableDots={true}
        colors={["#B78C68"]}
        fillOpacity={0.2}
        borderWidth={2}
        dotSize={7}
        dotColor={{ from: "color" }}
        dotBorderWidth={2}
        isInteractive={true}
      />
    </div>
  );
}
