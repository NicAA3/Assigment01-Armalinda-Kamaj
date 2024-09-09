import { type Locator, type Page } from '@playwright/test';
import { faker } from '@faker-js/faker';

export class CreateRoomPage {
  //Attributes
  readonly page: Page;
  readonly viewButton: Locator;
  readonly newRoomButton: Locator;
  readonly selectCategory: Locator;
  readonly selectNumber: Locator;
  readonly selectFloor: Locator;
  readonly selectAvailable: Locator;
  readonly selectPrice: Locator;
  readonly selectFeatures: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.viewButton = page.locator("#app > div > div > div:nth-child(1) > a")
    this.newRoomButton = page.getByRole('link', { name: 'Create Room' })
    this.selectCategory = page.getByRole('combobox');
    this.selectNumber = page.locator('div').filter({ hasText: /^Number$/ }).getByRole('spinbutton')
    this.selectFloor = page.locator('div').filter({ hasText: /^Floor$/ }).getByRole('spinbutton')
    this.selectAvailable = page.locator('.checkbox')
    this.selectPrice = page.locator('div').filter({ hasText: /^Price$/ }).getByRole('spinbutton')
    this.selectFeatures = page.getByRole('listbox')
    this.saveButton = page.getByText('Save')

  }

  async goToViewRoom() {
    await this.viewButton.click();
  }

  async goToCreateRoom() {
    await this.newRoomButton.click()
  }


  async fillOutCreateRoomsForm() {

    // Select a random category (Double, Single, Twin)
    const categoryOptions = ['Double', 'Single', 'Twin'];
    const randomCategory = faker.helpers.arrayElement(categoryOptions);
    await this.selectCategory.selectOption({ label: randomCategory });

    // Generate and fill out a random room number
    const roomNumber = faker.number.int({ min: 1, max: 100 }).toString();
    await this.selectNumber.fill(roomNumber);

    // Generate and fill out a random floor
    const randomFloor = faker.number.int({ min: 1, max: 10 }).toString();
    await this.selectFloor.fill(randomFloor);

    // Handle checkbox for availability
    await this.selectAvailable.click(); // Click to toggle checkbox state


    // Generate and fill out a random price
    const randomPrice = faker.number.int({ min: 50, max: 500 }).toString();
    await this.selectPrice.fill(randomPrice);


    // Select random features (multi-select listbox)
    const featureOptions = ['Balcony', 'Ensuite', 'Sea View', 'Penthouse'];
    const randomFeatures = faker.helpers.arrayElements(featureOptions, faker.number.int({ min: 1, max: featureOptions.length }));

    // Iterate over selected features and select them in the listbox
    for (const feature of randomFeatures) {
      await this.selectFeatures.selectOption({ label: feature });
    }
    await this.saveButton.click()
  }
}


