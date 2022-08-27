import { useState } from "react";

import { Options } from "@components/UI/Dropdown/Dropdown";

interface UseDropdownProps {
  option: Options[];
  value: Options;
}

interface UseDropdownReturn {
  options: Options[];
  setOptions: (option: Options[]) => void;
  DropdownValue: Options;
  handlerDropdown: () => void;
}

type UseSearchDropdown = (arg0: UseDropdownProps) => UseDropdownReturn;

const useDropdown: UseSearchDropdown = ({ option, value }) => {
  const [options, setOptions] = useState<Options[]>(option);

  const [DropdownValue, setDropdownValue] = useState<Options>(value);

  function handlerDropdown(): void {
    setDropdownValue(arguments[0]);
  }

  return {
    options,
    setOptions,
    DropdownValue,
    handlerDropdown,
  };
};

export default useDropdown;
