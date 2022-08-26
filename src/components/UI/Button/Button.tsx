import styles from "./Button.module.scss";

type ButtonProps = React.PropsWithChildren<{}> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  children = "click me",
  className,
  ...otherProps
}: ButtonProps) => {
  return (
    <button {...otherProps} className={`${styles["button"]} ${className}`}>
      {children}
    </button>
  );
};

export default Button;
