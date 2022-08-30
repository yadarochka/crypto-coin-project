export type Options = {
  key: string;
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  /** Массив возможных вариантов для выбора */
  options?: Options[];
  /** Текущие выбранные значения поля, массив может быть пустым */
  value?: Options;
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Options) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Преобразовать выбранные значения в строку. Отображается в дропдауне в качестве выбранного значения */
  pluralizeOptions?: (value: string) => string;

  className?: string;
};
