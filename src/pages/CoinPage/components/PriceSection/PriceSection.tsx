import { ThemeContext } from "app/providers/ThemeProvider";
import classnames from "classnames";

import React, { FC, useContext } from "react";

import { Tooltip, TooltipPosition } from "components/UI/Tooltip";

import styles from "./PriceSection.module.scss";

type PriceSectionProps = {
  marketCap: {
    [currency: string]: number;
  };
  symbol: string;
  currency: string;
  fullyDilutedValuation: {
    [currency: string]: number;
  };
  circulatingSupply: number;
  totalSupply: number;
  maxSupply: number;
};

export const PriceSection: FC<PriceSectionProps> = ({
  marketCap,
  symbol,
  currency,
  fullyDilutedValuation,
  circulatingSupply,
  totalSupply,
  maxSupply,
}) => {
  const { theme } = useContext(ThemeContext);

  return (
    <section>
      {marketCap.usd > 0 && (
        <div className={classnames(styles.row, styles[theme])}>
          <span className={styles.title}>
            Market cap{" "}
            <Tooltip position={TooltipPosition.bot}>
              <div>Market Cap = Current Price x Circulating Supply</div>
              <div>
                Refers to the total market value of a cryptocurrency’s
                circulating supply. It is similar to the stock market’s
                measurement of multiplying price per share by shares readily
                available in the market (not held & locked by insiders,
                governments)
              </div>
              <a href="https://en.wikipedia.org/wiki/Market_capitalization">
                Read more...
              </a>
            </Tooltip>
          </span>
          <span>
            {marketCap[currency]}
            {symbol}
          </span>
        </div>
      )}
      {fullyDilutedValuation.usd > 0 && (
        <div className={styles.row}>
          <span className={styles.title}>
            Fully Diluted Valuation{" "}
            <Tooltip position={TooltipPosition.bot}>
              <div>FDV = Current Price x Max Supply</div>
              <div>
                The market capitalization (valuation) if the max supply of a
                coin is in circulation. Note that it can take 3, 5, 10 or more
                years before the FDV can be reached, depending on how the
                emission schedule is designed.
              </div>
            </Tooltip>
          </span>
          <span>
            {fullyDilutedValuation.usd}
            {symbol}
          </span>
        </div>
      )}
      {circulatingSupply > 0 && (
        <div className={styles.row}>
          <span className={styles.title}>
            Circulating Supply{" "}
            <Tooltip position={TooltipPosition.bot}>
              <div>
                The amount of coins that are circulating in the market and are
                tradeable by the public. It is comparable to looking at shares
                readily available in the market (not held & locked by insiders,
                governments).
              </div>
            </Tooltip>
          </span>
          <span>{circulatingSupply}</span>
        </div>
      )}
      {totalSupply > 0 && (
        <div className={styles.row}>
          <span className={styles.title}>
            Total Supply{" "}
            <Tooltip position={TooltipPosition.bot}>
              <div>
                The amount of coins that have already been created, minus any
                coins that have been burned (removed from circulation). It is
                comparable to outstanding shares in the stock market.
              </div>
              <div>Total Supply = Onchain supply - burned tokens</div>
            </Tooltip>
          </span>
          <span>{totalSupply}</span>
        </div>
      )}
      {maxSupply > 0 && (
        <div className={styles.row}>
          <span className={styles.title}>
            Max Supply{" "}
            <Tooltip position={TooltipPosition.bot}>
              <div>
                The maximum number of coins coded to exist in the lifetime of
                the cryptocurrency. It is comparable to the maximum number of
                issuable shares in the stock market.
              </div>
              <div>Max Supply = Theoretical maximum as coded</div>
            </Tooltip>
          </span>
          <span>{maxSupply}</span>
        </div>
      )}
    </section>
  );
};
