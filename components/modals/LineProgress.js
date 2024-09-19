import React from "react";

const LineProgress = ({ percentage, start, thick, color,length }) => {
  // Clamp the percentage between 0 and 100
  const clampedPercentage = Math.min(100, Math.max(0, percentage));

  // Line dimensions
  const lineLength = length; // Length of the red line
  const lineY = 10;       // Y position of both lines
  const whiteLineY = 10;  // Y position of white line
  const circleRadius = (thick * 4); // Radius of the circle
  const lineWidth = thick;     // Width of the lines

  let redLineStartX = 0;
  let redLineEndX = (lineLength * clampedPercentage) / 100 - 5;

  if (start === "end") {
    // Red line grows from right to left
    redLineStartX = lineLength - redLineEndX;
    redLineEndX = lineLength;
  } else if (start === "center") {
    // Red line grows from the center to both sides
    redLineStartX = (lineLength / 2) - (lineLength * clampedPercentage) / 200;
    redLineEndX = (lineLength / 2) + (lineLength * clampedPercentage) / 200;
  }

  return (
    <svg width={lineLength} height="20">
      {/* White line */}
      <line
        x1="0"
        y1={whiteLineY}
        x2={lineLength}
        y2={whiteLineY}
        stroke={"#A0A0A0"}
        strokeWidth={thick}
      />
       {/* Circle at the end of the red line */}
       {start=="center" &&
       <circle
        cx={start === "center" ? redLineStartX: ""}
        cy={lineY}
        r={circleRadius}
        fill={color}
      />
       }
      {/* Red line */}
      <line
        x1={redLineStartX}
        y1={lineY}
        x2={redLineEndX}
        y2={lineY}
        stroke={color}
        strokeWidth={lineWidth}
      />

      {/* Circle at the end of the red line */}
      <circle
        cx={start === "center" ? redLineEndX : (start === "end" ? redLineStartX : redLineEndX)}
        cy={lineY}
        r={circleRadius}
        fill={color}
      />
    </svg>
  );
};

export default LineProgress;
