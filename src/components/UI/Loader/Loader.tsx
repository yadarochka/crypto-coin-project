import "./Loader.css";

type LoaderProps = {
  /**
   * Идет ли загрузка.
   * По умолчанию - true, для удобства использования
   * Если false, то лоадер не должен отображаться
   */
  loading?: boolean;
  /**
   * Размер лоадера. При передаче данного пропса, должен добавляться css-класс loader_size-{size}
   * По умолчанию: размер - LoaderSize.m, css-класс - loader_size-m
   */
  size?: LoaderSize;
  /**
   * Дополнительные CSS-классы.
   */
  className?: string;

  children?: React.ReactNode;
};

enum LoaderSize {
  s = "s",
  m = "m",
  l = "l",
}

export const Loader = ({
  loading = true,
  size = LoaderSize.l,
  className,
  children,
}: LoaderProps) => {
  if (!loading) return null;
  else
    return (
      <div className={`loader loader_size-${size} ${className}`}>
        {children}
      </div>
    );
};
export default Loader;
