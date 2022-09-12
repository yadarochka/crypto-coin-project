import { useState } from "react";

import { Option } from "components/UI/Dropdown";

interface UseDropdownProps {
  /** Варианты выбора */
  option: Option[];
  /** Выбранное значение */
  value: Option;
}

interface UseDropdownReturn {
  /** Варианты выбора */
  options: Option[];
  /** Установить варианты выбора */
  setOptions: (option: Option[]) => void;
  /** Выбранное значение */
  dropdownValue: Option;
  /** Установить выбранное значение */
  handlerDropdown: () => void;
}

type UseSearchDropdown = (arg0: UseDropdownProps) => UseDropdownReturn;

const useDropdown: UseSearchDropdown = ({ option, value }) => {
  const [options, setOptions] = useState<Option[]>(option);

  const [dropdownValue, setDropdownValue] = useState<Option>(value);

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
