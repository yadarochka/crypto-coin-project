import { useLocalStorage } from "shared/hooks/useLocalStorage";

import React, { FC, ReactNode, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { rounding } from "utils/rounding";

import Dropdown from "components/UI/Dropdown";
import { Option } from "components/UI/Dropdown/types";
import { IncreaseOrDecrease } from "components/UI/IncreaseOrDecrease";
import { Tooltip, TooltipPosition } from "components/UI/Tooltip";

import { NavigateButton } from "../NavigateButton";
import styles from "./InfoSection.module.scss";

type DropdownCurrency = ReactNode;

type InfoSectionProps = {
  name: string;
  img: string;
  symbol: string;
  rank: number;
  currency: string;
  currentPrice: {
    [currency: string]: number;
  };
  priceChange: {
    [currency: string]: number;
  };
  pricePercentageChange: {
    [currency: string]: number;
  };
  children: DropdownCurrency;
};

export const InfoSection: FC<InfoSectionProps> = ({
  name,
  img,
  symbol,
  rank,
  currency,
  currentPrice,
  priceChange,
  pricePercentageChange,
  children,
}) => {
  const [searchParams, setSearchParams] = useLocalStorage(
    "URLSearchParams",
    ""
  );
  const navigate = useNavigate();

  const navigateToPrevPage = () => navigate("/?" + searchParams);

  return (
    <>
      <section className={styles.nameBox}>
        <NavigateButton onClick={navigateToPrevPage} />
        <img className={styles.img} src={img} alt={name} />
        <h1 className={styles.coinName}>{name}</h1>
        {symbol.length < 5 && (
          <span className={styles.symbol}>({symbol.toUpperCase()})</span>
        )}
        <div className={styles.rank}>Rank #{rank ? rank : "?"}</div>
      </section>
      <section className={styles.priceBox}>
        <span className={styles.price}>
          {symbol.toUpperCase()} {currentPrice[currency]}
        </span>
        <IncreaseOrDecrease number={rounding(priceChange[currency], 7)} />
        <IncreaseOrDecrease
          percent
          parentheses
          number={pricePercentageChange[currency]}
        />
        <Tooltip>
          <span>24H Range</span>
        </Tooltip>
        <div className={styles.dropdownContainer}>{children}</div>
      </section>
    </>
  );
};
