class OnboardingPage {
    /**
     * Locator for the Continue button that appears on onboarding screens
     */
    private get continueButton() {
        return $('~com.monefy.app.lite:id/buttonContinue');
    }

    /**
     * Alternative locator using Android UiSelector for more robust element finding
     */
    private get continueButtonById() {
        return $('android=new UiSelector().resourceId("com.monefy.app.lite:id/buttonContinue")');
    }

    /**
     * Waits for the Continue button to be displayed and clickable
     * 
     * @param timeout - Maximum time to wait in milliseconds (default: 10000ms)
     * @returns true if button is ready, false otherwise
     */
    async waitForContinueButton(timeout: number = 10000): Promise<boolean> {
        try {
            await this.continueButtonById.waitForDisplayed({
                timeout,
                timeoutMsg: 'Continue button was not displayed within timeout'
            });

            await this.continueButtonById.waitForEnabled({
                timeout: 5000,
                timeoutMsg: 'Continue button was not enabled within timeout'
            });

            return true;
        } catch (error) {

            return false;
        }
    }

    /**
     * Taps the Continue button after validating it's ready for interaction
     * 
    
     * @throws Error if button is not available or tap fails
     */
    async tapContinue(): Promise<void> {
        const isReady = await this.waitForContinueButton();

        if (!isReady) {
            throw new Error('Continue button is not ready for interaction');
        }

        await this.continueButtonById.click();

        // Brief pause to allow screen transition to begin
        // This prevents race conditions where we check for the next screen too quickly
        await browser.pause(500);
    }

    /**
     * Completes the onboarding flow by tapping Continue button multiple times
     * 
     * @param steps - Number of times to tap the Continue button
     */
    async completeOnboardingSteps(steps: number): Promise<void> {
        for (let i = 0; i < steps; i++) {

            await this.tapContinue();
        }
    }

    /**
     * Verifies that the Continue button is present on the current screen
     * 
     * @returns true if Continue button is displayed
     */
    async isContinueButtonDisplayed(): Promise<boolean> {
        try {
            return await this.continueButtonById.isDisplayed();
        } catch (error) {
            return false;
        }
    }

    /**
     * Verifies that the onboarding screen is displayed by checking for the Continue button.
     */
    async verifyOnboardingDisplayed(): Promise<void> {
        const isDisplayed = await this.isContinueButtonDisplayed();
        if (!isDisplayed) {
            throw new Error('Onboarding screen (Continue button) is not displayed');
        }
    }
}

export default new OnboardingPage();
