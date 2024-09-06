import { test, expect } from "@playwright/test";
import { faker } from '@faker-js/faker';
import { LoginPage } from "./pages/login-page";
import { DashboardPage } from "./pages/dashboard-page"
import { CreateRoomPage } from "./pages/CreateRoom-page";
import { RoomsLoginPage } from "./pages/roomsLogin-page";
import { CreateNewClientPage } from "./pages/CreateNewClient-page";



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



test("Test case 03-create new client", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const createNewClientPage = new CreateNewClientPage(page)

  await loginPage.goto();
  await loginPage.performLogin(
    `${process.env.TEST_USERNAME}`,
    `${process.env.TEST_PASSWORD}`
  );
  await expect(
    page.getByRole("heading", { name: "Tester Hotel Overview" })
  ).toBeVisible();


  await createNewClientPage.createNewClientForm()
  // const fullName = faker.person.fullName();
  const element = page.locator(
    "#app > div > div.clients > div:nth-last-child(1)"
  );

  //await expect(element).toContainText(fullName);
  await expect(element).toContainText('Email');
  await expect(element).toContainText('Telephone');

  await page.waitForTimeout(5000);

});
