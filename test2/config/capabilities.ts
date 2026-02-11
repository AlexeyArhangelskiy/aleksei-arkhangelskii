export const androidCapabilities: WebdriverIO.Capabilities = {
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:deviceName': 'Android Emulator',
    'appium:appPackage': 'com.monefy.app.lite',
    'appium:appActivity': 'com.monefy.activities.main.MainActivity_',
    'appium:noReset': false,
    'appium:newCommandTimeout': 240,
};
