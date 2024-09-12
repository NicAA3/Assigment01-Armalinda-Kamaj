import { expect, type Locator, type Page } from "@playwright/test";

export class EditPage {
  //Attributes
  readonly page: Page;
  readonly viewRoomsButton: Locator
  readonly viewClientButton: Locator;
  readonly viewBillsButton: Locator;
  readonly viewReservationButton: Locator;
  readonly threeDotsRoomButton: Locator;
  readonly threeDotsClientButton: Locator;
  readonly threeDotsBillsButton: Locator;
  readonly threeDotsReservationButton: Locator;
  readonly editButton: Locator;
  readonly editClient: Locator;
  readonly editReservations: Locator;
  readonly NumberTextField: Locator
  readonly nameTextField: Locator;
  readonly valueTextField: Locator;
  readonly clientTextField: Locator;
  readonly saveButton: Locator;



  //Const
  constructor(page: Page) {
    this.page = page;
    this.viewRoomsButton = page.locator("#app > div > div > div:nth-child(1) > a");
    this.viewClientButton = page.locator('#app > div > div > div:nth-child(2) > a');
    this.viewBillsButton = page.locator('#app > div > div > div:nth-child(3) > a');
    this.viewReservationButton = page.locator('#app > div > div > div:nth-child(4) > a');
    this.threeDotsRoomButton = page.locator('.action').first();
    this.threeDotsClientButton = page.locator('.action').first();
    this.threeDotsBillsButton = page.locator('#app > div > div.bills > div:nth-child(1) > div.action > img');
    this.threeDotsReservationButton = page.locator('.action').first();
    this.editButton = page.getByText('Edit');
    this.editClient = page.getByText('Edit', { exact: true })
    this.editReservations = page.getByText('Edit', { exact: true })

    this.NumberTextField = page.locator('div').filter({ hasText: /^Number$/ }).getByRole('spinbutton');
    this.nameTextField = page.locator('div').filter({ hasText: /^Name$/ }).getByRole('textbox');
    this.valueTextField = page.getByRole('spinbutton');
    this.clientTextField = page.locator('#app > div > div:nth-child(2) > div:nth-child(5) > select')
    this.saveButton = page.getByText('Save');

  }

  // Methods / functions
  async gotoRoom() {
    await this.viewRoomsButton.click()
    await this.threeDotsRoomButton.click()
    await this.editButton.click()
    await this.NumberTextField.fill('200')
    await this.saveButton.click()
  };

  async gotoClient() {
    await this.viewClientButton.click()
    await this.threeDotsClientButton.click()
    await this.editClient.click()
    await this.nameTextField.fill('Edit Test')
    await this.saveButton.click()
  };
  async gotoBill() {
    await this.viewBillsButton.click()
    await this.threeDotsBillsButton.click()
    await this.editButton.click()
    await this.valueTextField.fill('10000')
    await this.saveButton.click()
  };
  async gotoReservation() {
    await this.viewReservationButton.click()
    await this.threeDotsReservationButton.click()
    await this.editReservations.click()
    await this.clientTextField.selectOption({ index: 2 });
    await this.saveButton.click()
  };


}