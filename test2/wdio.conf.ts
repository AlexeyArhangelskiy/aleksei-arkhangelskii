export const config = {

    runner: 'local',

    specs: [
        './tests/**/*.ts'
    ],

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
    }],

    logLevel: 'info',
    bail: 0,
    baseUrl: '',
    waitforTimeout: 10000,
    maxInstances: 1,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: [
        ['appium', {
            args: {
                address: '127.0.0.1',
                port: 4723
            },
            command: 'appium'
        }]
    ],
    framework: 'mocha',
    reporters: [
        'spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false,
        }]
    ],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
    afterTest: async function (test: any, context: any, { error, result, duration, passed, retries }: any) {
        if (!passed) {
            await browser.takeScreenshot();
        }
    }
};
