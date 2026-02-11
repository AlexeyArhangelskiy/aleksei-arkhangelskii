import MainPage from '../pages/MainPage';
import CalculatorPage from '../pages/CalculatorPage';
import AppPreconditions from '../utils/AppPreconditions';
import allure from '@wdio/allure-reporter';

const expectedExpenseValue = 5.00;
const expectedBalanceValue = -5.00;
const expenseAmount = '5';

describe('Monefy E2E - Add Expense', () => {

    beforeEach(async () => {
        await allure.step('Precondition: Handle Onboarding and Subscription', async () => {
            await AppPreconditions.handleOnboardingAndSubscription();
        });
    });

    it('should create an expense and update balance', async () => {
        await allure.step('1. Verify Main Screen is displayed', async () => {
            const isMainScreenLoaded = await MainPage.waitForMainScreen();
            expect(isMainScreenLoaded).toBe(true);
        });

        await allure.step('2. Tap on "Expense" button', async () => {
            await MainPage.tapExpenseButton();
        });

        await allure.step('3. Verify Calculator Screen is opened', async () => {
            const isCalculatorLoaded = await CalculatorPage.waitForCalculatorScreen();
            expect(isCalculatorLoaded).toBe(true);
        });

        await allure.step('4. Enter expense amount: Tap on digit "5"', async () => {
            await CalculatorPage.tapDigit(5);
        });

        await allure.step('5. Verify entered amount equals 5', async () => {
            const amount = await CalculatorPage.getAmountText();
            expect(amount).toBe(expenseAmount);
        });

        await allure.step('6. Tap on “Choose category” button', async () => {
            await CalculatorPage.tapChooseCategory();
        });

        await allure.step('7. Verify amount is preserved', async () => {
            const preservedAmount = await CalculatorPage.getAmountText();
            expect(preservedAmount).toBe(expenseAmount);
        });

        await allure.step('8. Select category “Bills”', async () => {
            await CalculatorPage.selectCategory('Bills');
        });

        await allure.step('9. Verify navigation back to Main Screen', async () => {
            const isMainScreenVisible = await MainPage.isMainScreenDisplayed();
            expect(isMainScreenVisible).toBe(true);
        });

        await allure.step('10. Verify expense amount on main screen', async () => {
            const expenseValue = await MainPage.getExpenseAmountValue();
            expect(expenseValue).toBe(expectedExpenseValue);
        });

        await allure.step('11. Verify balance value', async () => {
            const balanceValue = await MainPage.getBalanceAmountValue();
            expect(balanceValue).toBe(expectedBalanceValue);
        });
    });
});
