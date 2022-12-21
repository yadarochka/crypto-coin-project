import "@testing-library/jest-dom";
import { getByText, render, screen } from "@testing-library/react";
import "jest-styled-components";

import { IncreaseOrDecrease } from "./IncreaseOrDecrease";

describe("Тест компонента IncreaseOrDecrease", () => {
  it("Положительное значение", () => {
    render(<IncreaseOrDecrease number={99999.999} />);
    expect(screen.getByText<HTMLSpanElement>("99999.999")).toBeInTheDocument();
  });
  it("Отрицательное значение", () => {
    render(<IncreaseOrDecrease number={-1.5} />);
    expect(screen.getByText<HTMLSpanElement>("-1.5")).toBeInTheDocument();
  });
  it("Отображение с положительным процентом", () => {
    render(<IncreaseOrDecrease number={15} percent />);
    expect(screen.getByText<HTMLSpanElement>("15%")).toBeInTheDocument();
  });
  it("Отображение с отрицательным процентом", () => {
    render(<IncreaseOrDecrease number={-50.205} percent />);
    expect(screen.getByText<HTMLSpanElement>("-50.205%")).toBeInTheDocument();
  });
});
