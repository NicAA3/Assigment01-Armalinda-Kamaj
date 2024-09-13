import { type Locator, type Page } from "@playwright/test";
import { faker } from '@faker-js/faker';

export class EditRoomPage {
  //Attributes
  readonly page: Page;
  readonly viewButton: Locator;
  readonly selectButton: Locator;
  readonly editButton: Locator;
  readonly priceTextfield: Locator;
  readonly saveButton: Locator;




  constructor(page: Page) {
    this.page = page;
    this.viewButton = page.locator('#app > div > div > div:nth-child(1) > a');
    //select first room
    this.selectButton = page.locator('.action').first();
    this.editButton = page.getByText('Edit', { exact: true });
    this.priceTextfield = page.locator('div').filter({ hasText: /^Price$/ }).getByRole('spinbutton');
    this.saveButton = page.getByText('Save')

  }
  async goToViewRooms() {
    await this.viewButton.click();
  }
  async editRoomForm() {


    await this.selectButton.click();
    await this.editButton.click();
    const selectValue = faker.finance.amount({ dec: 0 }).toString();
    await this.priceTextfield.fill(selectValue);
    await this.saveButton.click();
    return selectValue;

  }
}
