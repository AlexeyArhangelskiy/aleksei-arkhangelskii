import MainPage from '../pages/MainPage';
import CalculatorPage from '../pages/CalculatorPage';
import AppPreconditions from '../utils/AppPreconditions';
import allure from '@wdio/allure-reporter';

const expectedIncomeValue = 9.00;
const expectedBalanceValue = 9.00;
const incomeAmount = '9';

describe('Monefy E2E - Add Income', () => {

    beforeEach(async () => {
        await allure.step('Precondition: Handle Onboarding and Subscription', async () => {
            await AppPreconditions.handleOnboardingAndSubscription();
        });
    });

    it('should create an income and update balance', async () => {
        await allure.step('1. Verify Main Screen is displayed', async () => {
            const isMainScreenLoaded = await MainPage.waitForMainScreen();
            expect(isMainScreenLoaded).toBe(true);
        });

        await allure.step('2. Tap on "Income" button', async () => {
            await MainPage.tapIncomeButton();
        });

        await allure.step('3. Verify Calculator Screen is opened', async () => {
            const isCalculatorLoaded = await CalculatorPage.waitForCalculatorScreen();
            expect(isCalculatorLoaded).toBe(true);
        });

        await allure.step('4. Enter income amount: Tap on digit "9"', async () => {
            await CalculatorPage.tapDigit(9);
        });

        await allure.step('5. Verify entered amount equals 9', async () => {
            const amount = await CalculatorPage.getAmountText();
            expect(amount).toBe(incomeAmount);
        });

        await allure.step('6. Tap on “Choose category” button', async () => {
            await CalculatorPage.tapChooseCategory();
        });

        await allure.step('7. Verify amount is preserved', async () => {
            const preservedAmount = await CalculatorPage.getAmountText();
            expect(preservedAmount).toBe(incomeAmount);
        });

        await allure.step('8. Select category “Salary”', async () => {
            await CalculatorPage.selectCategory('Salary');
        });

        await allure.step('9. Verify navigation back to Main Screen', async () => {
            const isMainScreenVisible = await MainPage.isMainScreenDisplayed();
            expect(isMainScreenVisible).toBe(true);
        });

        await allure.step('10. Verify income amount on main screen', async () => {
            const incomeValue = await MainPage.getIncomeAmountValue();
            expect(incomeValue).toBe(expectedIncomeValue);
        });

        await allure.step('11. Verify balance value', async () => {
            const balanceValue = await MainPage.getBalanceAmountValue();
            expect(balanceValue).toBe(expectedBalanceValue);
        });
    });
});
