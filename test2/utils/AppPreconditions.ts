
import OnboardingPage from '../pages/OnboardingPage';
import SubscriptionPage from '../pages/SubscriptionPage';
import MainPage from '../pages/MainPage';

/**
 * AppPreconditions - Helper class to ensure application state before tests
 */
class AppPreconditions {


    async handleOnboardingAndSubscription(): Promise<void> {

        if (await MainPage.isMainScreenDisplayed()) {
            console.log('[AppPreconditions] Already on Main Screen. Skipping onboarding.');
            return;
        }

        let continueVisible = await OnboardingPage.isContinueButtonDisplayed();
        let maxSteps = 10;
        let stepsTaken = 0;

        while (continueVisible && stepsTaken < maxSteps) {

            await OnboardingPage.tapContinue();
            stepsTaken++;

            await browser.pause(500);

            continueVisible = await OnboardingPage.isContinueButtonDisplayed();
        }

        if (stepsTaken >= maxSteps) {
            console.warn('[AppPreconditions] Warning: Max onboarding steps reached. Check if flow has changed.');
        }

        const isSubscriptionPage = await SubscriptionPage.waitForSubscriptionPage(3000);

        if (isSubscriptionPage) {
            await SubscriptionPage.closeAd();
        } else {
            console.log('[AppPreconditions] No Subscription page detected.');
        }

        const isMainLoaded = await MainPage.waitForMainScreen(5000);
        if (!isMainLoaded) {
            throw new Error('[AppPreconditions] Failed to reach Main Screen after onboarding.');
        }

        console.log('[AppPreconditions] Successfully reached Main Screen.');
    }
}

export default new AppPreconditions();
