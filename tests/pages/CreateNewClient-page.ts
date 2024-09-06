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
    const fullName = faker.person.fullName();
    await this.nameTextfield.fill(fullName)
    const userEmail = faker.internet.email();
    await this.emailTextfield.fill(userEmail)
    const userPhoneNo = faker.phone.number();
    await this.telephoneTextfield.fill(userEmail)
    await this.saveButton.click()

  }
}
