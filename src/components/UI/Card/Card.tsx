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
  /** Стили */
  className: string;
  /** Наличие графика в карточке */
  withChart?: boolean;
  /** На карточке будет отображаться информация о токене */
  priceType?: boolean;
  /** На карточке будет отображаться информация о наличии токена у конкретного пользователя */
  userType?: boolean;
  /** Нужно исправить (при передачи одинаковых значений priceType и userType будет сломано отображение) */
}

export const Card = ({
  image = "https://avatars2.githubusercontent.com/u/9127594?v=3&s=60",
  name = "Здесь заголовок",
  subtitle = "Здесь описание",
  price,
  priceChange,
  className,
  withChart = true,
  priceType,
  userType,
}: CardProps) => {
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
          {userType && `00.00 `}
          {subtitle.toUpperCase()}
        </span>
      </div>
      {withChart && (
        <div className={styles["card__chart"]}>
          <div>График</div>
        </div>
      )}
      {priceType && (
        <div className={styles["card__price-box"]}>
          <div className={styles["card__price"]}>{price}</div>
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
      {userType && (
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
