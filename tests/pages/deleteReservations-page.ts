import { type Locator, type Page } from "@playwright/test";
import { faker } from '@faker-js/faker';

export class DeleteReservationsPage {
    //Attributes
    readonly page: Page;
    readonly viewResButton: Locator;
    readonly selectRes: Locator;
    readonly DeleteButton: Locator;

    //Const
    constructor(page: Page) {
        this.page = page;
        this.viewResButton = page.locator('#app > div > div > div:nth-child(4) > a');
        this.selectRes = page.getByRole('img').last()//select the last reservation
        this.DeleteButton = page.getByText('Delete');
    }

    //Methods


    async goToViewReservation() {
        await this.viewResButton.click();
    }


    async DeleteReservationForm() {
        await this.selectRes.click();
        await this.DeleteButton.click();
    }
}