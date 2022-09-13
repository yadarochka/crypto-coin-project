import { FC } from "react";
import React from "react";

import Chart from "components/UI/Chart";

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
          />
        </div>
      )}
      {cardType === "priceType" && (
        <div className={styles["card__price-box"]}>
          <div className={styles["card__price"]}>
            {currency} {price}
          </div>
          {priceChange > 0 && (
            <div
              className={`${styles["card__price-change"]} ${styles["success"]}`}
            >
              +{priceChange}%
            </div>
          )}
          {priceChange < 0 && (
            <div
              className={`${styles["card__price-change"]} ${styles["danger"]}`}
            >
              {priceChange}%
            </div>
          )}
        </div>
      )}
      {cardType === "userType" && (
        <div className={styles["card__price-box"]}>
          <div className={styles["card__price"]}>${`00.00`}</div>
          {priceChange > 0 && (
            <div
              className={`${styles["card__price-change"]} ${styles["success"]}`}
            >
              +{`00.00`}%
            </div>
          )}
          {priceChange < 0 && (
            <div
              className={`${styles["card__price-change"]} ${styles["danger"]}`}
            >
              {`00.00`}%
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Card;
