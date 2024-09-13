import { type Locator, type Page } from "@playwright/test";
import { faker } from '@faker-js/faker';

export class EditReservationPage {
  //Attributes
  readonly page: Page;
  readonly viewButton: Locator;
  readonly selectButton: Locator;
  readonly editButton: Locator;
  readonly roomBox: Locator;
  readonly saveButton: Locator;




  constructor(page: Page) {
    this.page = page;
    this.viewButton = page.locator('#app > div > div > div:nth-child(4) > a');
    //select reservation
    this.selectButton = page.locator('.action').last();
    this.editButton = page.getByText('Edit', { exact: true });
    this.roomBox = page.locator('#app > div > div:nth-child(2) > div:nth-child(6) > select');
    this.saveButton = page.getByText('Save')

  }
  async goToViewReservations() {
    await this.viewButton.click();
  }
  async editReservationForm() {


    await this.selectButton.click();
    await this.editButton.click();
    await this.roomBox.click();
    await this.roomBox.selectOption({ index: 2 });// change to index 2
    await this.saveButton.click()

  }
}
