import React from 'react';
import styled from 'styled-components';
const HalfPieChartContainer = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
`;
import styles from './halfpie.module.scss'; // Import the scoped styles

const Semicircelpie = ({ percentage = 40, pathFill = '#FFFFFF', lineStroke = '#C9FFCE' }) => {
  var halfpie = percentage / 2;
  const path = `${halfpie} ${100 - halfpie}`;

  return (
    <div class={styles["donut"]}>
      <svg width="100%" height="100%" viewBox="0 0 40 40">
        <defs>
          <clipPath id="c">
            <rect width="40" height="20" />
          </clipPath>
        </defs>
        <g clip-path="url(#c)">
          {/* <circle class="donut-hole" cx="20" cy="20" r="15.91549430918954" fill="#fff"></circle> */}
          <circle class={styles["donut-ring"]} cx="20" cy="20" r="15.91549430918954" fill="transparent" stroke-width="6" style={{ stroke: pathFill }}></circle>
          <circle class={styles["donut-segment-2"]} cx="21" cy="20" r="15.91549430918954" fill="transparent" stroke-width="7" stroke-dasharray={path} style={{ stroke: lineStroke }} stroke-dashoffset="50">

          </circle>
        </g>
      </svg>
      <h4 className={styles['indicator']}>
        {percentage}%
      </h4>
    </div>
  );
};
export default Semicircelpie;

