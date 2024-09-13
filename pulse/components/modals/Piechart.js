import React from 'react';
import styled from 'styled-components';
const HalfPieChartContainer = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
`;

const Piechart =({ percentage = 40, pathFill = '#C9FFCE', lineStroke = '#A9DFD8' }) => {
  const path = "10 90";

  return (
    <svg width="100%" height="100%" viewBox="0 0 40 40" class="donut">
            <defs>
                <clipPath id="c">
                    <rect width="40" height="20" />
                </clipPath>
            </defs>
            <g clip-path="url(#c)">
                {/* <circle class="donut-hole" cx="20" cy="20" r="15.91549430918954" fill="#fff"></circle> */}
                <circle class="donut-ring" cx="20" cy="20" r="15.91549430918954" fill="transparent" stroke-width="3.5"></circle>
                <circle class="donut-segment donut-segment-2" cx="20" cy="20" r="15.91549430918954" fill="transparent" stroke-width="3.5" stroke-dasharray={path} stroke-dashoffset="50">

                </circle>
            </g>

        </svg>
  );
};
export default Piechart;

