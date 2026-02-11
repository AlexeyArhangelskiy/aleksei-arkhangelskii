class CalculatorPage {
    /**
     * Taps a digit on the keyboard
     * @param n The digit to tap (0-9)
     */
    async tapDigit(n: number): Promise<void> {
        const button = $(`android=new UiSelector().resourceId("com.monefy.app.lite:id/buttonKeyboard${n}")`);
        await button.waitForDisplayed({ timeout: 5000 });
        await button.click();
    }

    /**
     * Locator for the amount text display
     */
    private get amountText() {
        return $('android=new UiSelector().resourceId("com.monefy.app.lite:id/amount_text")');
    }

    /**
     * Locator for the "Choose category" button (action button on keyboard)
     */
    private get chooseCategoryButton() {
        return $('android=new UiSelector().resourceId("com.monefy.app.lite:id/keyboard_action_button")');
    }

    /**
     * Gets the current amount displayed
     */
    async getAmountText(): Promise<string> {
        await this.amountText.waitForDisplayed({ timeout: 5000 });
        return await this.amountText.getText();
    }

    /**
     * Taps the "Choose category" button to proceed to category selection
     */
    async tapChooseCategory(): Promise<void> {
        await this.chooseCategoryButton.waitForDisplayed({ timeout: 5000 });
        await this.chooseCategoryButton.click();
    }

    /**
     * Selects a category by name from the grid
     * @param name The name of the category (e.g., "Salary", "Bills")
     */
    async selectCategory(name: string): Promise<void> {
        const category = $(`//android.widget.TextView[@resource-id="com.monefy.app.lite:id/textCategoryName" and @text="${name}"]`);
        await category.waitForDisplayed({ timeout: 5000 });
        await category.click();
    }

    async waitForCalculatorScreen(): Promise<boolean> {
        try {
            await this.amountText.waitForDisplayed({ timeout: 5000 });
            return true;
        } catch (error) {

            return false;
        }
    }
}

export default new CalculatorPage();
