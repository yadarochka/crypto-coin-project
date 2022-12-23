import puppeteer, { Browser, Page } from "puppeteer";

const BASE_URL = "http://localhost:9000/";

describe("Навигация приложения", () => {
  let browser: Browser;
  let page: Page;
  const width = 1920;
  const height = 1080;

  beforeEach(async () => {
    browser = await puppeteer.launch({
      headless: true,
      slowMo: 80,
      args: [`--window-size=${width},${height}`],
    });
    page = await browser.newPage();
    await page.setViewport({ width, height });
    await page.goto(BASE_URL);
  });

  it.each(["bitcoin", "dogecoin", "tether"])(
    "Переход на страницу %s по клику на карточку",
    async (title) => {
      await page.waitForXPath("//h3");
      await page.click(`[data-testId=${title}-card]`);

      const url = page.url();

      expect(url).toEqual(BASE_URL + title);
    },
    70000
  );

  it("Переход на Coins Page / Desktop", async () => {
    await page.click("[data-testId=categories-nav]");
    await page.click("[data-testId=coins-nav]");

    const url = page.url();

    expect(url).toEqual(BASE_URL);
  }, 70000);

  it("Переход на Coins Page / Mobile", async () => {
    await page.setViewport({
      width: 365,
      height: 1080,
    });
    await page.click("[data-testId=burger-menu]");
    await page.click("[data-testId=categories-nav]");
    await page.click("[data-testId=burger-menu]");
    await page.click("[data-testId=coins-nav]");

    const url = page.url();

    expect(url).toEqual(BASE_URL);
  }, 70000);

  it("Переход на Categories Page / Desktop", async () => {
    await page.click("[data-testId=categories-nav]");

    const url = await page.url();

    expect(url).toEqual(BASE_URL + "categories");
  }, 70000);

  it("Переход на Categories Page / Mobile", async () => {
    await page.setViewport({
      width: 365,
      height: 1080,
    });
    await page.click("[data-testId=burger-menu]");
    await page.click("[data-testId=categories-nav]");

    const url = page.url();

    expect(url).toEqual(BASE_URL + "categories");
  }, 70000);

  it("Клик на логотип ведёт на главную страницу", async () => {
    await page.click("[data-testId=categories-nav]");
    await page.click("[data-testId=logo]");

    const url = page.url();

    expect(url).toEqual(BASE_URL);
  }, 70000);

  afterEach(() => {
    browser.close();
  });
});
