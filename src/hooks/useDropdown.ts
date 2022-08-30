import { useState } from "react";

import { Options } from "@components/UI/Dropdown";

interface UseDropdownProps {
  /** Варианты выбора */
  option: Options[];
  /** Выбранное значение */
  value: Options;
}

interface UseDropdownReturn {
  /** Варианты выбора */
  options: Options[];
  /** Установить варианты выбора */
  setOptions: (option: Options[]) => void;
  /** Выбранное значение */
  dropdownValue: Options;
  /** Установить выбранное значение */
  handlerDropdown: () => void;
}

type UseSearchDropdown = (arg0: UseDropdownProps) => UseDropdownReturn;

const useDropdown: UseSearchDropdown = ({ option, value }) => {
  const [options, setOptions] = useState<Options[]>(option);

  const [dropdownValue, setDropdownValue] = useState<Options>(value);

  function handlerDropdown(): void {
    setDropdownValue(arguments[0]);
  }

  return {
    options,
    setOptions,
    dropdownValue,
    handlerDropdown,
  };
};

export default useDropdown;
