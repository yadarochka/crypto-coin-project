import { useState } from "react";

interface UseSearchInputReturn {
  search: string;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
