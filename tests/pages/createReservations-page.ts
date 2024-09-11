import { type Locator, type Page } from "@playwright/test";
import { faker } from '@faker-js/faker';

export class CreateReservationsPage {
    //Attributes
    readonly page: Page;
    readonly viewButton: Locator;
    readonly createReservationButton: Locator;
    readonly startTextfield: Locator;
    readonly endTextField: Locator;
    readonly clientTextField: Locator;
    readonly roomTextField: Locator;
    readonly billTextField: Locator;
    readonly saveButton: Locator;

    //Const
    constructor(page: Page) {
        this.page = page;
        this.viewButton = page.locator('#app > div > div > div:nth-child(4) > a');
        this.createReservationButton = page.getByRole('link', { name: 'Create Reservation' });
        this.startTextfield = page.locator('div').filter({ hasText: /^Start \(Format YYYY-MM-DD\)$/ }).getByPlaceholder('YYYY-MM-DD')
        this.endTextField = page.locator('div').filter({ hasText: /^End \(Format YYYY-MM-DD\)$/ }).getByPlaceholder('YYYY-MM-DD');
        this.clientTextField = page.getByRole('combobox').first();
        this.roomTextField = page.locator('#app > div > div:nth-child(2) > div:nth-child(4) > select');
        this.billTextField = page.locator('#app > div > div:nth-child(2) > div:nth-child(5) > select');
        this.saveButton = page.getByText('Save')
    }

    //Methods


    async goToViewReservation() {
        await this.viewButton.click();
    }

    async goToCreateReservation() {
        await this.createReservationButton.click();
    }

    async fillNewReservationForm() {

        const startDate = faker.date.soon({ days: 30 }).toISOString().split('T')[0]; // Format YYYY-MM-DD
        await this.startTextfield.fill(startDate);


        const endDate = faker.date.soon({ days: 30, refDate: startDate }).toISOString().split('T')[0]; // Format YYYY-MM-DD
        await this.endTextField.fill(endDate);

        //choose a fullname from the list
        await this.clientTextField.selectOption({ index: 1 }); //to select Jonas Hellman
        await this.roomTextField.selectOption({ index: 1 }) // to select  first options
        await this.billTextField.selectOption({ index: 1 }); // to select first options

        // Click save
        await this.saveButton.click()
        return { startDate, endDate };
    }
}