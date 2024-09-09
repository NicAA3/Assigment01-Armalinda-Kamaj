import { test, expect } from "@playwright/test";
//import { faker } from '@faker-js/faker';
import { LoginPage } from "./pages/login-page";
import { DashboardPage } from "./pages/dashboard-page";
import { CreateRoomPage } from "./pages/CreateRoom-page";
import { CreateNewClientPage } from "./pages/CreateNewClient-page";

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.performLogin(
    `${process.env.TEST_USERNAME}`,
    `${process.env.TEST_PASSWORD}`
  );

  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();

});

test.afterEach(async ({ page }) => {
  const dashboardPage = new DashboardPage(page);
  await dashboardPage.performLogout()

  //await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  //await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();

  await page.waitForTimeout(5000);

});


test.describe("Test suite 01", () => {

  test("TC 01A", async ({ page }) => {

    const dashboardPage = new DashboardPage(page);

    await dashboardPage.performLogout()
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();

    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.performLogin(
      `${process.env.TEST_USERNAME}`,
      `${process.env.TEST_PASSWORD}`
    );

    await expect(
      page.getByRole("heading", { name: "Tester Hotel Overview" })
    ).toBeVisible();
    await page.waitForTimeout(5000);

  });



  test("TC 02-create room", async ({ page }) => {

    const createRoomPage = new CreateRoomPage(page);
    //Enter to room page
    await createRoomPage.goToViewRoom();
    await expect(page.getByText('Rooms')).toBeVisible()
    //Enter to Create room Form
    await createRoomPage.goToCreateRoom();
    await expect(page.getByText('New Room')).toBeVisible();

    // Fill out the form to create a new room
    const category = await createRoomPage.selectCategory.inputValue();
    const roomNumber = await createRoomPage.selectNumber.inputValue();
    const floor = await createRoomPage.selectFloor.inputValue();
    const price = await createRoomPage.selectPrice.inputValue();
    const features = await createRoomPage.selectFeatures.inputValue();

    //Create a new room
    await createRoomPage.fillOutCreateRoomsForm();

    // Get the last created room element
    const lastRoomElement = page.locator("#app > div > div.rooms > div:nth-last-child(1)");

    // Assertions 
    await expect(lastRoomElement).toContainText(category);
    await expect(lastRoomElement).toContainText(roomNumber);
    await expect(lastRoomElement).toContainText(floor);
    await expect(lastRoomElement).toContainText('Available');
    await expect(lastRoomElement).toContainText(price);
    await expect(lastRoomElement).toContainText(features);

    await page.waitForTimeout(5000);
  });


  /**  test("TC 02-create room", async ({ page }) => {
  
     const createRoomPage = new CreateRoomPage(page);
  
     await createRoomPage.goToViewRoom();
     await expect(page.getByText('Rooms')).toBeVisible()
  
     await createRoomPage.goToCreateRoom()
     await expect(page.getByText('New Room')).toBeVisible();
  
     await createRoomPage.fillOutCreateRoomsForm();
     const element = page.locator("#app > div > div.rooms > div:nth-last-child(1)");
     await expect(element).toContainText('Floor');
     await expect(element).toContainText('Available');
     await expect(element).toContainText('Price');
     await expect(element).toContainText('Features')
     await page.waitForTimeout(5000);
  
   });
  */
  test("TC 03-create new client", async ({ page }) => {

    const createNewClientPage = new CreateNewClientPage(page)

    await createNewClientPage.createNewClientForm()
    const element = page.locator(
      "#app > div > div.clients > div:nth-last-child(1)"
    );
    // Assertions 
    await expect(element).toContainText(createNewClientPage.fullName);
    await expect(element).toContainText(createNewClientPage.userEmail);
    await expect(element).toContainText(createNewClientPage.userPhoneNo);
    await page.waitForTimeout(5000);

  });
});