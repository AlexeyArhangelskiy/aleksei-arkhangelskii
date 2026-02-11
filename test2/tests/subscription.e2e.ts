import allure from '@wdio/allure-reporter';
import OnboardingPage from '../pages/OnboardingPage';
import SubscriptionPage from '../pages/SubscriptionPage';
import MainPage from '../pages/MainPage';

describe('Monefy Onboarding and subscriptionFlow', () => {
    before(async () => {
        await allure.step('Precondition: Waiting for app to launch', async () => {
            await browser.pause(2000);
        });
    });

    it('should allow a free user to go through onboarding and complete a subscription purchase', async () => {

        await allure.step('Step 1: Verifying onboarding screen is displayed', async () => {
            await OnboardingPage.verifyOnboardingDisplayed();
        });

        await allure.step('Step 2: Completing 4 onboarding screens', async () => {
            await OnboardingPage.completeOnboardingSteps(4);
        });

        await allure.step('Step 3: Checking for advertisement screen and Buy Button', async () => {
            await SubscriptionPage.handleSubscriptionAndVerifyBuyButton();
        });

        await allure.step('Step 4: Verifying main screen is displayed', async () => {
            const isMainScreenDisplayed = await MainPage.isMainScreenDisplayed();
            expect(isMainScreenDisplayed).toBe(true);

            const balanceText = await MainPage.getBalanceText();
            expect(balanceText).toContain('Balance');
        });
    });
});


