import { expect, type Locator, type Page } from "@playwright/test";

export class RoomsLoginPage {
    //Attributes
    readonly page: Page;
    readonly roomsTextfield: Locator;
    readonly viewButton: Locator;
    readonly newRoomButton: Locator;


    //Const
    constructor(page: Page) {
        this.page = page;
        this.roomsTextfield = page.getByRole('heading', { name: 'Rooms' });
        this.viewButton = page.locator("#app > div > div > div:nth-child(1) > a")
        this.newRoomButton = page.getByRole('link', { name: 'Create Room' })
    }

    // Methods / functions
    async performLoginRoom() {
        await this.viewButton.click()
        await this.newRoomButton.click()
    }

}
