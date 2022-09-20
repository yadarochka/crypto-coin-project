import classNames from "classnames";

import React, {
  FC,
  ReactComponentElement,
  ReactNode,
  useRef,
  useState,
} from "react";

import { useKeyboardEvent } from "utils/useKeyboardEvent";

import icon from "images/Tooltip-icon.svg";

import styles from "./Tooltip.module.scss";

export enum TooltipPostition {
  top = "top",
  bot = "bot",
}

type TooltipProps = {
  className?: string;
  children: ReactNode;
  position?: TooltipPostition;
};

export const Tooltip: FC<TooltipProps> = ({
  className,
  children,
  position = TooltipPostition.top,
}) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const targetRef = useRef<HTMLImageElement>(null);
  const handleOutsideClick = (event: any) => {
    if (targetRef.current) {
      if (targetRef.current.contains(event.target)) {
        return;
      }
      setIsClicked(false);
    }
  };
  const handleClick = () => {
    if (!isClicked) {
      document.addEventListener("click", handleOutsideClick, false);
    } else {
      document.removeEventListener("click", handleOutsideClick, false);
    }
    setIsClicked((prevState) => !prevState);
  };
  const tooltipId = Math.random();
  useKeyboardEvent("Enter", handleClick, `tooltip${tooltipId}`);

  return (
    <div className={classNames(styles.tooltip, className)}>
      <img
        id={`tooltip${tooltipId}`}
        tabIndex={0}
        ref={targetRef}
        onClick={handleClick}
        className={styles["tooltip__icon"]}
        src={icon}
        alt=""
      />
      {isClicked && (
        <div
          className={classNames(
            styles["tooltip__content"],
            position === TooltipPostition.top
              ? styles["tooltip-top"]
              : styles["tooltip-bot"]
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
};
