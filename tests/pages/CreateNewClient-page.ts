import { type Locator, type Page } from "@playwright/test";
import { faker } from '@faker-js/faker';

export class CreateNewClientPage {
  //Attributes
  readonly page: Page;
  readonly viewButton: Locator;
  readonly createClienButton: Locator;
  readonly nameTextfield: Locator;
  readonly emailTextfield: Locator;
  readonly telephoneTextfield: Locator;
  readonly saveButton: Locator;
  fullName: string;
  userEmail: string;
  userPhoneNo: string;
  static fullName: readonly unknown[];



  constructor(page: Page) {
    this.page = page;
    // this.viewButton = page.locator('div').filter({ hasText: /^ClientsNumber: 2View$/ }).getByRole('link')
    this.viewButton = page.locator('#app > div > div > div:nth-child(2) > a')
    this.createClienButton = page.getByRole('link', { name: 'Create Client' });
    this.nameTextfield = page.locator('div').filter({ hasText: /^Name$/ }).getByRole('textbox');
    this.emailTextfield = page.locator('input[type="email"]');
    this.telephoneTextfield = page.locator('div').filter({ hasText: /^Telephone$/ }).getByRole('textbox');
    this.saveButton = page.getByText('Save')

  }

  async createNewClientForm() {

    await this.viewButton.click()
    await this.createClienButton.click()
    this.fullName = faker.person.fullName();
    await this.nameTextfield.fill(this.fullName)
    this.userEmail = faker.internet.email();
    await this.emailTextfield.fill(this.userEmail)
    this.userPhoneNo = faker.phone.number();
    await this.telephoneTextfield.fill(this.userPhoneNo)
    await this.saveButton.click()

    return {
      fullName: this.fullName,
      email: this.userEmail,
      phoneNo: this.userPhoneNo,
    };

  }
}
