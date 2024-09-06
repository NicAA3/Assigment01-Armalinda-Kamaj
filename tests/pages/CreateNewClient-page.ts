import { type Locator, type Page } from "@playwright/test";

export class CreateNewClientPage {
  //Attributes
  readonly page: Page;
  readonly selectElement: Locator;
  //Add the missing attributes

  constructor(page: Page) {
    this.page = page;
    this.selectElement = page.getByRole("combobox"); //Use the select element
    //Add the missing attributes
  }

  async fillOutCreateRoomsForm() {
    await this.selectElement.selectOption({ index: 0 }); //to select Double option
    await this.selectElement.selectOption({ index: 1 }); //to select single option
    await this.selectElement.selectOption({ index: 2 }); //to select twin option
    //Add the missing elements that are to be filled out in the form. Think about using e.g. fakerjs
  }
}
