import { type Locator, type Page } from "@playwright/test";
import { faker } from '@faker-js/faker';

export class DeleteReservationsPage {
    //Attributes
    readonly page: Page;
    readonly viewButton: Locator;
    readonly selectReservation: Locator;
    readonly editButton: Locator;
    readonly DeleteButton: Locator;

    //Const
    constructor(page: Page) {
        this.page = page;
        this.viewButton = page.locator('#app > div > div > div:nth-child(4) > a');
        this.selectReservation = page.getByRole('img').last()//select the last bill
        this.editButton = page.getByText('Edit');
        this.DeleteButton = page.getByText('Delete');
    }

    //Methods


    async goToViewReservation() {
        await this.viewButton.click();
    }


    async DeleteReservationForm() {
        await this.selectReservation.click();
        await this.editButton.click();
        await this.DeleteButton.click();
    }
}