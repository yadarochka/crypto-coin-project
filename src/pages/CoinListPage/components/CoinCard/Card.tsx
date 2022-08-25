/* @ts-ignore */
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

  price: number;

  priceChange: number;

  className: string;
}

export const Card = ({
  image = "https://avatars2.githubusercontent.com/u/9127594?v=3&s=60",
  name = "Здесь заголовок",
  subtitle = "Здесь описание",
  price,
  priceChange,
  className,
}: CardProps) => {
  const floor = (number: number): number => {
    return Math.round(number * Math.pow(10, 2)) / Math.pow(10, 2);
  };

  return (
    <div className={`${styles.card} ${className}`}>
      <div className={styles["card__img-box"]}>
        <img
          src={image}
          alt="Изображение карточки"
          className={styles["card__img"]}
        />
      </div>
      <div>
        <h3 className={styles["card__title"]}>{name}</h3>
        <span className={styles["card__subtitle"]}>
          {subtitle.toUpperCase()}
        </span>
      </div>
      <div className={styles["card__content"]}>
        <div>График</div>
      </div>
      <div>
        <div>${price}</div>
        {priceChange > 0 && (
          <div className={styles["success"]}>+{floor(priceChange)}%</div>
        )}
        {priceChange < 0 && (
          <div className={styles["danger"]}>{priceChange}%</div>
        )}
      </div>
    </div>
  );
};
