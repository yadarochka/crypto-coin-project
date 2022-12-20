import { rounding } from "./rounding";

describe("Округление числа", function () {
  it("Округление в меньшую сторону (положительное число)", () => {
    const floatNumber = 1.234;

    const roundedNumber = rounding(floatNumber);

    expect(roundedNumber).toEqual(1.23);
  });

  it("Округление в большую сторону (положительное число)", () => {
    const floatNumber = 0.009;

    const roundedNumber = rounding(floatNumber);

    expect(roundedNumber).toEqual(0.01);
  });

  it("Число знаков после запятой меньше заданных", () => {
    const floatNumber = 1.5;

    const roundedNumber = rounding(floatNumber);

    expect(roundedNumber).toEqual(1.5);
  });

  it("Округление в меньшую сторону (отрицательное число)", () => {
    const floatNumber = -1.234;

    const roundedNumber = rounding(floatNumber);

    expect(roundedNumber).toEqual(-1.23);
  });

  it("Округление в большую сторону (отрицательное число)", () => {
    const floatNumber = -0.009;

    const roundedNumber = rounding(floatNumber);

    expect(roundedNumber).toEqual(-0.01);
  });

  it("Передаем аргументы", () => {
    const floatNumber = 1.454545;

    const roundedNumber1 = rounding(floatNumber, 1);
    const roundedNumber2 = rounding(floatNumber, 2);
    const roundedNumber3 = rounding(floatNumber, 3);
    const roundedNumber4 = rounding(floatNumber, 4);
    const roundedNumber5 = rounding(floatNumber, 5);

    expect(roundedNumber1).toEqual(1.5);
    expect(roundedNumber2).toEqual(1.45);
    expect(roundedNumber3).toEqual(1.455);
    expect(roundedNumber4).toEqual(1.4545);
    expect(roundedNumber5).toEqual(1.45455);
  });
});
