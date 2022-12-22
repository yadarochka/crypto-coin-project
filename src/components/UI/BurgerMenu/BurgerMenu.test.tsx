import "@testing-library/jest-dom";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";

import { BurgerMenu } from "./BurgerMenu";

const items = [
  {
    linkTo: "/abc",
    imgSrc: "",
    label: "ABC",
  },
  {
    linkTo: "/123",
    imgSrc: "",
    label: "123",
  },
  {
    linkTo: "/bitcoin",
    imgSrc: "",
    label: "Bitcoin",
  },
];

describe("Тест BurgerMenu", () => {
  it("Snapshot-тестирование бургер-иконки", () => {
    const { container } = render(<BurgerMenu items={items} />);

    expect(container).toMatchSnapshot();
  });

  it("Snapshot-тестирование меню", () => {
    render(
      <MemoryRouter>
        <BurgerMenu items={items} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByTestId("burger-menu"));
    const menu = screen.getByTestId("menu");

    expect(menu).toMatchSnapshot();
  });

  it("Бургер-иконка рендерится", () => {
    render(<BurgerMenu items={items} />);

    expect(screen.getByTestId("burger-menu")).toBeInTheDocument();
  });

  it("Меню не видно в выключенном состоянии", () => {
    render(<BurgerMenu items={items} />);

    expect(
      screen.queryByLabelText<HTMLLinkElement>(/ABC/)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText<HTMLLinkElement>(/123/)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText<HTMLLinkElement>(/Bitcoin/)
    ).not.toBeInTheDocument();
  });

  it("Меню появляется при первом нажатии на бургер-иконку и скрывается при повторном", () => {
    render(
      <MemoryRouter>
        <BurgerMenu items={items} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByTestId("burger-menu"));

    expect(screen.getByText<HTMLDivElement>(/ABC/)).toBeInTheDocument();
    expect(screen.getByText<HTMLDivElement>(/123/)).toBeInTheDocument();
    expect(screen.getByText<HTMLDivElement>(/Bitcoin/)).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("burger-menu"));

    expect(
      screen.queryByLabelText<HTMLLinkElement>(/ABC/)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText<HTMLLinkElement>(/123/)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText<HTMLLinkElement>(/Bitcoin/)
    ).not.toBeInTheDocument();
  });

  afterEach(cleanup);
});
