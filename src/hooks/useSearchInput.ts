import { useState } from "react";

interface UseSearchInputReturn {
  /** Содержимое инпута */
  search: string;
  /** Функция изменения содержимого инпута */
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Функция, вызываемая при клике на кнопку */
  handlerSearchButton: () => void;
}

type UseSearchInput = () => UseSearchInputReturn;

const useSearchInput: UseSearchInput = () => {
  const [search, setSearch] = useState("");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handlerSearchButton: () => void = () => {
    setSearch("");
  };

  return {
    search,
    handleInput,
    handlerSearchButton,
  };
};

export default useSearchInput;
