import "./Card.css";
type CardProps = {
  /** URL изображения */
  image: string;
  /** Заголовок карточки */
  name: React.ReactNode;
  /** Подзаголовок карточки */
  subtitle: React.ReactNode;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  content?: React.ReactNode;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;

  price: number;

  priceChange: number;
};

export const Card = ({
  image = "https://avatars2.githubusercontent.com/u/9127594?v=3&s=60",
  name = "Здесь заголовок",
  subtitle = "Здесь описание",
  content = "Здесь контент",
  price,
  priceChange,
}: CardProps) => {
  return (
    <div className="card">
      <div className="card__img-box">
        <img src={image} alt="Изображение карточки" className="card__img" />
      </div>
      <div>
        <h3 className="card__title">{name}</h3>
        <span className="card__subtitle">{subtitle}</span>
      </div>
      <div className="card__content">
        <div>График</div>
      </div>
      <div>
        <div>${price}</div>
        {priceChange > 0 && <div>+{priceChange}%</div>}
        {priceChange < 0 && <div>-{priceChange}%</div>}
      </div>
    </div>
  );
};
