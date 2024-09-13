import React from 'react';
import styles from './CircleChart.module.scss'; // Import the scoped styles

const CircleChart = ({ percentage, color, size }) => {
    const radius = 90; // Radius of the main circle
    const circumference = 2 * Math.PI * radius; // Circumference of the circle

    // Calculate stroke-dashoffset based on the percentage
    const offset = circumference * (1 - percentage / 100);

    // Calculate the position of the endpoint of the green circle
    const angle = (percentage / 100) * 2 * Math.PI - Math.PI / 2; // Angle for endpoint
    const endX = 100 + radius * Math.cos(angle); // X coordinate for endpoint
    const endY = 100 + radius * Math.sin(angle); // Y coordinate for endpoint

    return (
        <div className={styles['circleChart']} style={{ width: size.Width, height: size.Height }}>
            <div className={styles['circle']}>
                <svg
                    // style={{width:size.Width, height: size.Height}}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 200 200"
                    width={"100%"}
                    height={"100%"}
                >
                    {/* Background circle */}
                    {/* <circle
        cx="100"T
        cy="100"
        r={radius}
        fill="none"
        stroke="lightgray"
        strokeWidth="3"
      /> */}

                    {/* Foreground circle (progress bar) */}
                    <circle
                        cx="100"
                        cy="100"
                        r={radius}
                        fill="none"
                        stroke={color}
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        transform="rotate(-90 100 100)" // Start at top
                    />

                    {/* Small circle at the end of the progress line */}
                    {percentage > 0 && (
                        <circle
                            cx={endX}
                            cy={endY}
                            r="6" // Radius of the small endpoint circle
                            fill={color} // Same color as the progress line
                        />
                    )}
                </svg>

                <div className={styles['content']}>
                    <div>
                        <h4>Outstanding</h4>
                        <span>30%</span>
                    </div>
                </div>
                <div
                    className={styles["hoverlabel"]}
                    style={{
                        position: "absolute",
                        left: `${endX}px`, // Adjust the position dynamically
                        top: `${endY}px`, // Adjust the position dynamically
                    }}
                >
                    234 Sold (34%) {/* Show the percentage value */}
                </div>
            </div>
        </div>
    );
};

export default CircleChart;
