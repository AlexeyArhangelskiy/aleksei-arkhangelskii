# Monefy Appium Test Automation

Automated E2E testing for the Monefy Android app using Appium, WebdriverIO, and TypeScript.

## Prerequisites

- **Node.js**: v18+ (v20 recommended)  
- **Android SDK**: Installed and configured  
- **Android Emulator**: Running  
- **Monefy App**: Installed on emulator. Downloadable from [Android](https://play.google.com/store/apps/details?id=com.monefy.app.lite)  

> **Note:** The emulator must have the Monefy app installed prior to running tests.

## Setup

### 1. Navigate to Project Folder
```bash
cd test2
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment

Ensure your shell has the following environment variables set (add to `~/.zshrc` or `~/.bashrc`):

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

### 4. Start Android Emulator

```bash
emulator -avd <your_emulator_name>
```

Verify emulator is running:
```bash
adb devices
```

## Running Tests

```bash
npm test
```

Note
1.Tests run sequentially during local execution.
2.Each test is isolated and independent; the order of execution does not affect results.

This will:
1. Start Appium server automatically
2. Connect to the Android emulator
3. Launch the Monefy app
4. Run the test suite
5. Generate Allure reports

## Project Structure

```
test2/
├── config/
│   └── capabilities.ts       # Appium capabilities configuration
├── pages/                    # Page Object Model classes
│   ├── MainPage.ts
│   ├── OnboardingPage.ts
│   ├── SubscriptionPage.ts
│   └── CalculatorPage.ts
├── tests/
│   ├── subscription.e2e.ts   # Subscription flow
│   ├── addExpense.e2e.ts     # Add Expense scenarios
│   └── addIncome.e2e.ts      # Add Income scenarios
├── utils/
│   └── AppPreconditions.ts   # Test setup helpers
├── wdio.conf.ts              # WebdriverIO configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies and scripts
```

## Test Configuration

### Capabilities (`wdio.conf.ts`)

```typescript
capabilities: [{
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:deviceName': 'Android Emulator',
    'appium:appPackage': 'com.monefy.app.lite',
    'appium:appActivity': 'com.monefy.activities.main.MainActivity_',
    'appium:autoGrantPermissions': true,
    'appium:noReset': false,
    'appium:fullReset': false,
    'appium:appWaitActivity': '*'
}]
```

## Current Tests

### 1. Subscription (`subscription.e2e.ts`)
- Verifies the onboarding flow  
- Checks the subscription/ad screen and the ability to purchase a subscription  
- Ensures user can reach the main screen after the flow

### 2. Add Expense (`addExpense.e2e.ts`)
- Navigates to Calculator via "Expense" button
- Enters an amount and selects a category
- Verifies expense is added and balance updates correctly

### 3. Add Income (`addIncome.e2e.ts`)
- Navigates to Calculator via "Income" button
- Enters an amount and selects a category
- Verifies income is added and balance updates correctly

## Reporting

Test results are available in:
- **Console**: Spec reporter output
- **Allure Reports**: `allure-results/` directory

To view Allure reports:
```bash
npm run report
```

## Troubleshooting

### Tests fail to connect to emulator
- Ensure emulator is running: `adb devices`
- Verify Monefy app is installed: `adb shell pm list packages | grep monefy`

### Appium connection errors
- Check Appium is not already running on port 4723
- WebdriverIO starts Appium automatically via the service

### Node version issues
- Verify Node v20 is active: `node -v`
- Switch to Node v20: `nvm use 20`

### Stuck Appium Process
If you see errors like `EADDRINUSE: address already in use 127.0.0.1:4723`, it means an Appium server instance is already running and blocking the port.

1. **Find the process ID (PID):**
    ```bash
    lsof -i :4723
    ```
    OR
    ```bash
    ps aux | grep appium
    ```

2. **Kill the process:**
    ```bash
    kill -9 <PID>
    ```
    Example: `kill -9 12345`
