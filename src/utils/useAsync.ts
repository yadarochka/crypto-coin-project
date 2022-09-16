import { useEffect } from "react";

export const useAsync = (
  func: () => Promise<any>,
  inputs: React.DependencyList
): void => {
  useEffect(() => {
    func();
  }, inputs);
};
