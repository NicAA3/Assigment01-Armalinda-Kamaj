import { type Locator, type Page } from "@playwright/test";
import { faker } from '@faker-js/faker';

export class CreateBillsPage {
  //Attributes
  readonly page: Page;
  readonly viewButton: Locator;
  readonly createButton: Locator;
  readonly valueTextfield: Locator;
  readonly selectPaid: Locator;
  readonly saveButton: Locator;

  //Const
  constructor(page: Page) {
    this.page = page;
    this.viewButton = page.locator('#app > div > div > div:nth-child(3) > a');
    this.createButton = page.getByRole('link', { name: 'Create Bill' });
    this.valueTextfield = page.getByRole('spinbutton');
    this.selectPaid = page.locator('.checkbox');
    this.saveButton = page.getByText('Save')
  }

  //Methods


  async goToViewBills() {
    await this.viewButton.click();
  }

  async goToCreateBills() {
    await this.createButton.click();
  }

  async fillNewBillForm() {
    const selectValue = faker.finance.amount({ dec: 0 }).toString();
    await this.valueTextfield.fill(selectValue);
    await this.selectPaid.dispatchEvent('click')
    await this.saveButton.click();
    return selectValue;
  }
}