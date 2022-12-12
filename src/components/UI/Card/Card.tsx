import classnames from "classnames";

import { FC } from "react";
import React from "react";

import { currencySymbol } from "store/coinStore/currencySymbol";

import Chart from "components/UI/Chart/Chart";

import { IncreaseOrDecrease } from "../IncreaseOrDecrease";
import styles from "./Card.module.scss";

interface CardProps {
  /** URL изображения */
  image: string;
  /** Заголовок карточки */
  name: React.ReactNode;
  /** Подзаголовок карточки */
  subtitle: string;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  content?: React.ReactNode;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
  /** Цена токена */
  price: number;
  /** Изменение цены*/
  priceChange: number;
  /** Валюта */
  currency: string;
  /** Стили */
  className: string;
  /** На карточке будет отображаться информация о токене */

  coinData?: number[];

  coinLabels?: string[];

  onMouseEvent?: boolean;
}

export const Card: FC<CardProps> = ({
  image,
  name,
  subtitle,
  price,
  priceChange,
  className,
  currency,
  coinData = [],
  coinLabels = [],
  onMouseEvent,
}) => {
  const colorChart = priceChange < 0 ? "#d90429" : "#21bf73";
  const symbol: string = currencySymbol[currency] || currency.toUpperCase();
  return (
    <div className={`${styles.card} ${className}`}>
      <img src={image} className={styles.img} alt="Coin" />
      <div className={styles.title}>
        <h3 className={styles.name}>{name}</h3>
        <span className={styles.subtitle}>{subtitle.toUpperCase()}</span>
      </div>
      <div>
        <Chart
          coinData={coinData}
          coinLabels={coinLabels}
          onMouseEvent={false}
          className={styles.chart}
          color={colorChart}
        />
      </div>
      <div className={styles.priceBox}>
        <span className={styles.price}>{symbol + price}</span>
        <IncreaseOrDecrease percent={priceChange} className={styles.percent} />
      </div>
    </div>
  );
};

export default Card;
