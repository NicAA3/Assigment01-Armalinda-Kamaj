import { type Locator, type Page } from "@playwright/test";
import { faker } from '@faker-js/faker';

export class EditClientPage {
  //Attributes
  readonly page: Page;
  readonly viewButton: Locator;
  readonly actionButton: Locator;
  readonly editButton: Locator;
  readonly emailTextfield: Locator;
  readonly telephoneTextfield: Locator;
  readonly saveButton: Locator;
  userEmail: string;
  userPhoneNo: string;



  constructor(page: Page) {
    this.page = page;
    this.viewButton = page.locator('#app > div > div > div:nth-child(2) > a');
    //select first client
    this.actionButton = page.locator('.action').first();
    this.editButton = page.getByText('Edit');
    this.emailTextfield = page.locator('input[type="email"]');
    this.telephoneTextfield = page.locator('div').filter({ hasText: /^Telephone$/ }).getByRole('textbox');
    this.saveButton = page.getByText('Save')

  }

  async editClientForm() {

    await this.viewButton.click()
    await this.actionButton.click()
    await this.editButton.click()
    //update user email adress
    this.userEmail = faker.internet.email();
    await this.emailTextfield.fill(this.userEmail)
    //update user phone number
    this.userPhoneNo = faker.phone.number();
    await this.telephoneTextfield.fill(this.userPhoneNo)
    await this.saveButton.click()

  }
}
