class SubscriptionPage {
    private get closeButton() {
        return $('android=new UiSelector().resourceId("com.monefy.app.lite:id/buttonClose")');
    }
    private get adTitle() {
        return $('android=new UiSelector().resourceId("com.monefy.app.lite:id/textViewTitle")');
    }
    private get purchaseButton() {
        return $('android=new UiSelector().resourceId("com.monefy.app.lite:id/buttonPurchase")');
    }

    /**
     * Waits for the advertisement screen to be displayed
     * 
     * @param timeout - Maximum time to wait in milliseconds (default: 10000ms)
     * @returns true if Subscription page is displayed
     */
    async waitForSubscriptionPage(timeout: number = 10000): Promise<boolean> {
        try {
            await this.closeButton.waitForDisplayed({
                timeout,
                timeoutMsg: 'Subscription page close button was not displayed within timeout'
            });

            await this.adTitle.waitForDisplayed({
                timeout: 5000,
                timeoutMsg: 'Subscription page title was not displayed'
            });

            return true;
        } catch (error) {

            return false;
        }
    }

    /**
     * Closes the advertisement screen by tapping the close button
     * 
     * @throws Error if Subscription page is not displayed or close action fails
     */
    async closeAd(): Promise<void> {
        const isDisplayed = await this.waitForSubscriptionPage();

        if (!isDisplayed) {
            throw new Error('Subscription page is not displayed, cannot close');
        }

        await this.closeButton.click();
        await browser.pause(1500);
    }

    /**
     * Verifies that the advertisement screen is currently displayed
     * 
     * @returns true if Subscription page is visible
     */
    async isSubscriptionPageDisplayed(): Promise<boolean> {
        try {
            const closeButtonVisible = await this.closeButton.isDisplayed();
            const titleVisible = await this.adTitle.isDisplayed();
            return closeButtonVisible && titleVisible;
        } catch (error) {
            return false;
        }
    }

    /**
     * Gets the advertisement title text
     * 
     * @returns The title text or empty string if not available
     */
    async getAdTitle(): Promise<string> {
        try {
            await this.adTitle.waitForDisplayed({ timeout: 5000 });
            return await this.adTitle.getText();
        } catch (error) {

            return '';
        }
    }
    private get buyButton() {
        return $('android=new UiSelector().resourceId("com.monefy.app.lite:id/frameLayoutPurchase")');
    }

    /**
     * Checks if the Buy App button is displayed
     */
    async isBuyButtonDisplayed(): Promise<boolean> {
        return this.buyButton.isDisplayed();
    }

    /**
     * Taps the Buy App button
     */
    async tapBuyButton(): Promise<void> {
        await this.buyButton.click();
    }

    /**
     * Verifies if Google Play Store is opened
     */
    async isGooglePlayOpened(): Promise<boolean> {
        // Wait briefly for app switch
        await browser.pause(3000);
        const currentPackage = await browser.getCurrentPackage();

        return currentPackage !== 'com.monefy.app.lite';
    }

    async handleSubscriptionAndVerifyBuyButton(): Promise<void> {
        const isDisplayed = await this.waitForSubscriptionPage(5000);

        if (!isDisplayed) {

            return;
        }

        const title = await this.getAdTitle();
        if (!title) throw new Error('Subscription page title not found');

        if (await this.isBuyButtonDisplayed()) {

            await this.tapBuyButton();
            const opened = await this.isGooglePlayOpened();

            if (opened) {

                await browser.back();
                await this.waitForSubscriptionPage(3000);
            } else {
                console.log('Google Play Store is not opened');

            }
        } else {
            console.log('Buy Button is not displayed');
        }

        await this.closeButton.click();
        await this.closeButton.waitForDisplayed({ reverse: true, timeout: 3000 });
    }
}

export default new SubscriptionPage();
