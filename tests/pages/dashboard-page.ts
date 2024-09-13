import { expect, type Locator, type Page } from "@playwright/test";

export class DashboardPage {
  //Attributes
  readonly page: Page;
  readonly viewClientButton: Locator;
  readonly viewRoomButton: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.viewClientButton = page.locator('#app > div > div > div:nth-child(2) > a');
    this.viewRoomButton = page.locator("#app > div > div > div:nth-child(1) > a");
    this.logoutButton = page.getByRole("button", { name: "Logout" });
  }

  async gotoClient() {
    await this.viewClientButton.click()
  }

  async gotoRoom() {
    await this.viewRoomButton.click()
  }
  async performLogout() {
    await this.logoutButton.click();
  }

}
