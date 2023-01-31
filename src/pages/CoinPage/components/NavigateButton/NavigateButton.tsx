import { ThemeContext } from "app/providers/ThemeProvider";
import classnames from "classnames";

import React, { useContext } from "react";

import styles from "./NavigateButton.module.scss";

export const NavigateButton = ({ onClick }: { onClick: () => void }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <button onClick={onClick} className={styles.button}>
      <svg
        className={classnames(styles.svg, styles[theme])}
        width="20px"
        height="20px"
        viewBox="-4 0 20 20"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <title>Back to previous page</title>
        <g
          id="Free-Icons"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <g
            transform="translate(-825.000000, -674.000000)"
            id="Group"
            stroke="#000000"
            strokeWidth="2"
          >
            <g transform="translate(819.000000, 672.000000)" id="Shape">
              <polyline points="17.0011615 3 7 12.0021033 17.0011615 21.0042067" />
            </g>
          </g>
        </g>
      </svg>
    </button>
  );
};
