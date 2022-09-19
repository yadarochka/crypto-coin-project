import { FC } from "react";
import React from "react";

import { currencySymbol } from "store/coinStore/currencySymbol";

import Chart from "components/UI/Chart/Chart";

import { Favourites } from "../Favourites";
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
  /** Наличие графика в карточке */
  withChart?: boolean;
  /** На карточке будет отображаться информация о токене */
  cardType?: string;
  priceType?: boolean;

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
  withChart = true,
  cardType,
  currency,
  coinData = [],
  coinLabels = [],
  onMouseEvent,
}) => {
  const colorChart = priceChange < 0 ? "#d90429" : "#21bf73";
  const symbol: string = currencySymbol[`${currency}`]
    ? currencySymbol[`${currency}`]
    : `${currency.toUpperCase()} `;
  return (
    <div className={`${styles.card} ${className}`}>
      <div className={styles["card__img-box"]}>
        <img
          src={image}
          alt="Изображение карточки"
          className={styles["card__img"]}
        />
      </div>
      <div className={styles["card__name"]}>
        <h3 className={styles["card__title"]}>{name}</h3>
        <span className={styles["card__subtitle"]}>
          {cardType === "userType" && `00.00 `}
          {subtitle.toUpperCase()}
        </span>
      </div>
      {withChart && (
        <div className={styles["card__chart-box"]}>
          <Chart
            coinData={coinData}
            coinLabels={coinLabels}
            onMouseEvent={false}
            className={styles["card__chart"]}
            color={colorChart}
          />
        </div>
      )}
      {cardType === "priceType" && (
        <div className={styles["card__price-box"]}>
          <div className={styles["card__price"]}>{symbol + `${price}`}</div>
          <IncreaseOrDecrease
            procent={priceChange}
            className={styles["card__price-change"]}
          />
        </div>
      )}
      {cardType === "userType" && (
        <div className={styles["card__price-box"]}>
          <div className={styles["card__price"]}>${`00.00`}</div>
          <IncreaseOrDecrease
            number={"00.00"}
            className={styles["card__price-change"]}
          />
        </div>
      )}
    </div>
  );
};

export default Card;
