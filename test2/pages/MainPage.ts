class MainPage {
    /**
     * Locator for the balance amount display
     */
    private get balanceAmount() {
        return $('android=new UiSelector().resourceId("com.monefy.app.lite:id/balance_amount")');
    }

    /**
     * Locator for the expense button (red minus button)
     */
    private get expenseButton() {
        return $('android=new UiSelector().resourceId("com.monefy.app.lite:id/expense_button")');
    }

    /**
     * Locator for the income button (green plus button)
     */
    private get incomeButton() {
        return $('android=new UiSelector().resourceId("com.monefy.app.lite:id/income_button")');
    }

    /**
     * Locator for the income amount text on the main screen (green text)
     */
    private get incomeAmountText() {
        return $('android=new UiSelector().resourceId("com.monefy.app.lite:id/income_amount_text")');
    }

    /**
     * Locator for the total expense amount text on the main screen (red text)
     */
    get expenseAmountText() {
        return $('android=new UiSelector().resourceId("com.monefy.app.lite:id/expense_amount_text")');
    }

    /**
     * Taps on the income button (green plus button)
     * Opens the calculatr screen for adding income
     */
    async tapIncomeButton() {
        await this.incomeButton.waitForDisplayed({ timeout: 5000 });
        await this.incomeButton.click();
    }

    /**
     * Gets the parsed income amount from the main screen
     * removes currency symbols and returns the numeric value
     * 
     * @returns The income amount as a float
     */
    async getIncomeAmountValue(): Promise<number> {
        await this.incomeAmountText.waitForDisplayed({ timeout: 5000 });
        const text = await this.incomeAmountText.getText();
        return parseFloat(text.replace(/[^0-9.]/g, ''));
    }

    /**
     * Taps on the expense button (red minus button)
     * Opens the calculator screen for adding an expense
     */
    async tapExpenseButton() {
        await this.expenseButton.click();
    }

    private get toolbarTitle() {
        return $('android=new UiSelector().text("Monefy")');
    }

    private get navigationButton() {
        return $('android=new UiSelector().description("Open navigation")');
    }

    /**
     * Waits for the main screen to be fully loaded
     * 
     * @param timeout - Maximum time to wait in milliseconds
     * @returns true if main screen is loaded
     */
    async waitForMainScreen(timeout: number = 15000): Promise<boolean> {
        try {
            await this.balanceAmount.waitForDisplayed({
                timeout,
                timeoutMsg: 'Balance amount was not displayed within timeout'
            });

            await this.expenseButton.waitForDisplayed({
                timeout: 5000,
                timeoutMsg: 'Expense button was not displayed'
            });

            await this.incomeButton.waitForDisplayed({
                timeout: 5000,
                timeoutMsg: 'Income button was not displayed'
            });

            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * Verifies that the main screen is currently displayed
     * 
     * @returns true if all main screen elements are visible
     */
    async isMainScreenDisplayed(): Promise<boolean> {
        try {
            const balanceVisible = await this.balanceAmount.isDisplayed();
            const expenseButtonVisible = await this.expenseButton.isDisplayed();
            const incomeButtonVisible = await this.incomeButton.isDisplayed();

            return balanceVisible && expenseButtonVisible && incomeButtonVisible;
        } catch (error) {
            return false;
        }
    }

    /**
     * Gets the current balance text displayed on the main screen
     * 
     * @returns The balance text (e.g., "Balance $0.00")
     */
    async getBalanceText(): Promise<string> {
        try {
            await this.balanceAmount.waitForDisplayed({ timeout: 5000 });
            return await this.balanceAmount.getText();
        } catch (error) {
            return '';
        }
    }

    async isToolbarTitleCorrect(): Promise<boolean> {
        try {
            await this.toolbarTitle.waitForDisplayed({ timeout: 5000 });
            const titleText = await this.toolbarTitle.getText();
            return titleText === 'Monefy';
        } catch (error) {
            return false;
        }
    }

    /**
     * Gets the parsed expense amount from the main screen
     * 
     * @returns The expense amount as a float
     */
    async getExpenseAmountValue(): Promise<number> {
        await this.expenseAmountText.waitForDisplayed({ timeout: 5000 });
        const text = await this.expenseAmountText.getText();
        return parseFloat(text.replace(/[^0-9.]/g, ''));
    }

    /**
     * Gets the parsed balance amount from the main screen
     * 
     * @returns The balance amount as a float (can be negative)
     */
    async getBalanceAmountValue(): Promise<number> {
        await this.balanceAmount.waitForDisplayed({ timeout: 5000 });
        const text = await this.balanceAmount.getText();
        // Remove non-numeric characters except dot and minus
        return parseFloat(text.replace(/[^0-9.-]/g, ''));
    }

    async verifyMainScreenLoaded(): Promise<boolean> {
        const screenDisplayed = await this.isMainScreenDisplayed();
        const titleCorrect = await this.isToolbarTitleCorrect();

        if (screenDisplayed && titleCorrect) {
            return true;
        } else {
            return false;
        }
    }
}

export default new MainPage();
