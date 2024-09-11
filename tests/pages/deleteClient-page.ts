import { type Locator, type Page } from "@playwright/test";
import { faker } from '@faker-js/faker';

export class DeleteClientPage {
  //Attributes
  readonly page: Page;
  readonly viewButton: Locator;
  readonly selectBill: Locator;
  readonly editButton: Locator;
  readonly DeleteButton: Locator;

  //Const
  constructor(page: Page) {
    this.page = page;
    this.viewButton = page.locator('#app > div > div > div:nth-child(2) > a');
    this.selectBill = page.getByRole('img').last()//select the last client
    this.editButton = page.getByText('Edit');
    this.DeleteButton = page.getByText('Delete');
  }



  //Methods
  async goToViewClient() {
    await this.viewButton.click();
  }

  async deleteClientForm() {
    await this.selectBill.click();
    await this.editButton.click();
    await this.DeleteButton.click();
  }
}