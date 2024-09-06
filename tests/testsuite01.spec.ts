import { test, expect } from "@playwright/test";
import { faker } from '@faker-js/faker';
import { LoginPage } from "./pages/login-page";
import { DashboardPage } from "./pages/dashboard-page"
import { CreateRoomPage } from "./pages/CreateRoom-page";
import { RoomsLoginPage } from "./pages/roomsLogin-page";



test.describe("Test suite 01", () => {
  test("Test case 01", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.goto();
    await loginPage.performLogin(
      `${process.env.TEST_USERNAME}`,
      `${process.env.TEST_PASSWORD}`
    );
    await expect(
      page.getByRole("heading", { name: "Tester Hotel Overview" })
    ).toBeVisible();

    await dashboardPage.performLogout();
    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
    await page.waitForTimeout(5000);

  });
});


test("Test case 02-create rooms", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const roomsLoginPage = new RoomsLoginPage(page)
  const createRoomPage = new CreateRoomPage(page)




  await loginPage.goto();
  await loginPage.performLogin(
    `${process.env.TEST_USERNAME}`,
    `${process.env.TEST_PASSWORD}`
  );

  await roomsLoginPage.performLoginRoom()
  await createRoomPage.fillOutCreateRoomsForm();

  const element = page.locator("#app > div > div.rooms > div:nth-last-child(1)")

  await expect(element).toContainText('Category');
  await expect(element).toContainText('Available');
  await expect(element).toContainText('Price');
  await expect(element).toContainText('Features')

  await page.waitForTimeout(5000);

});

/** 
test.describe("Test suite 01", () => {
  test("Test case 03-create new client", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const createRoomPage = new CreateRoomPage(page);

    await loginPage.goto();
    await loginPage.performLogin(
      `${process.env.TEST_USERNAME}`,
      `${process.env.TEST_PASSWORD}`
    );
    await expect(
      page.getByRole("heading", { name: "Tester Hotel Overview" })
    ).toBeVisible();


    await expect(page.getByRole("heading", { name: "Rooms" })).toBeVisible();
    await page.locator("div").filter({ hasText: /^RoomsNumber: 2View$/ }).getByRole("link").click();
    await expect(page.getByText("Rooms")).toBeVisible();
    await page.getByRole("link", { name: "Create Room" }).click();
    await expect(page.getByText("New Room")).toBeVisible();


    await dashboardPage.performLogout();
    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
    await page.waitForTimeout(5000);

  });
});
*/