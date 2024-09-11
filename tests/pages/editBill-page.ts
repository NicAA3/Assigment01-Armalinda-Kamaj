import { type Locator, type Page } from "@playwright/test";
import { faker } from '@faker-js/faker';

export class EditBillPage {
  //Attributes
  readonly page: Page;
  readonly viewButton: Locator;
  readonly actionButton: Locator;
  readonly editButton: Locator;
  readonly valueTextfield: Locator;
  readonly saveButton: Locator;




  constructor(page: Page) {
    this.page = page;
    this.viewButton = page.locator('#app > div > div > div:nth-child(3) > a');
    //select first client
    this.actionButton = page.locator('.action').first();
    this.editButton = page.getByText('Edit');
    this.valueTextfield = page.getByRole('spinbutton');
    this.saveButton = page.getByText('Save')

  }
  async goToViewBills() {
    await this.viewButton.click();
  }
  async editBillForm() {


    await this.actionButton.click()
    await this.editButton.click()
    const selectValue = faker.finance.amount({ dec: 0 }).toString();
    await this.valueTextfield.fill(selectValue);
    await this.saveButton.click()

    return selectValue;
  }
}
