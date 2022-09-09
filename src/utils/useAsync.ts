/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

export const useAsync = (func: () => Promise<any>, inputs: any[]): void => {
  useEffect(() => {
    func().then();
  }, inputs);
};
