import puppeteer from "puppeteer";
import fs from "fs";

const scarpping = async () => {
    const browser = await puppeteer.launch({
        headless: false,
        args: ["--start-maximized"],
    });
    const page = await browser.newPage();

    const [width, height] = await page.evaluate(() => {
        return [window.screen.availWidth, window.screen.availHeight];
    });

    await page.setViewport({ width, height: 640 });

    await page.goto(
        "http://localhost:8080/#/?id=00000000-0000-0000-0000-000000000000"
        // "http://localhost:8080/#/?id=00000000-0000-0000-0000-000000000000&manufacturerId=TATA"
    );

    // First page (Home Page)
    await page.waitForSelector("#firstName", { visible: true });
    await page.type("#firstName", "Test");
    await page.type("#lastName", "Data");
    await page.type("#mob-no", "9876543210");
    await page.type("#dob", "11-11-1999");
    await page.click("#policy");
    await page.click(".invest-btn");

    // Second Page (Selector Page)
    await page.waitForSelector(".getQuotes", { visible: true });
    await page.click(".getQuotes");

    // Third Page (Multi Quote)
    await page.waitForSelector(".selectquestions", { visible: true });
    const element = await page.$$(".selectquestions");
    await element[2].select("All Plans");

    await page.waitForSelector("#FGPlus-129", { visible: true, timeout: 50000 });
    await page.click("#FGPlus-129");

    // Forth Page (Gate Criteria)
    const savingsGateCriteriaRawData = fs.readFileSync("./savingsGateCriteria.json");
    const savingsGateCriteria = JSON.parse(savingsGateCriteriaRawData);
    await page.waitForSelector("#relationWithFirstLifeAssured", {
        visible: true,
    });
    await fillFormFields(page, savingsGateCriteria);
    await page.click('#submit-form');

    try {
        await page.evaluate(() => {
            const button = document.querySelector('#is-suitability-yes');
            if (button) button.click();
        });
    } catch (error) {
        console.log('Button Not clicked successfully');
    }
    // Single Quote
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 30000)));
    await page.waitForSelector('#submit-sq', { visible: true, timeout: 30000 });
    await page.click("#submit-sq");
    await page.click("#submit-sq");
    await page.click("#submit-sq");

    // Checkout
    await page.waitForSelector('#checked-out', { visible: true, timeout: 10000 });
    await page.click("#checked-out");

    for (let i = 1; i <= 6; i++) {
        await waitForPageAndFillForm(page, i);
        if (i < 6) {
            // await page.click("#submit");
        }
    }
};

scarpping();

async function loadFormData(pageNumber) {
    const rawData = fs.readFileSync(`./proposalFormData/page${pageNumber}Form.json`);
    return JSON.parse(rawData);
}

async function waitForPageAndFillForm(page, pageNumber) {
    const formData = await loadFormData(pageNumber);
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 10000)));
    console.log(`Start page ${pageNumber}`);
    await fillFormFields(page, formData);
    console.log(`done form page ${pageNumber}`);
}

const fillFormFields = async (page, formData, timeoutTime = 500) => {
    for (const key of Object.keys(formData)) {
        const fields = formData[key];
        for (const field of fields) {
            try {
                if (field.type === "text" || field.type === "currency") {
                    await page.waitForSelector(`input[name="${field.name}"]`, { visible: true, timeout: timeoutTime });

                    const isDisabled = await page.evaluate((name) => {
                        const input = document.querySelector(`input[name="${name}"]`);
                        return input ? input.disabled : false;
                    }, field.name);

                    if (isDisabled) {
                        console.log(`Field "${field.name}" is disabled, skipping...`);
                        continue;
                    }

                    await page.evaluate((name) => {
                        document.querySelector(`input[name="${name}"]`).value = "";
                    }, field.name);
                    await page.type(`input[name="${field.name}"]`, field.input);

                } else if (field.type === "single-select") {
                    await page.waitForSelector(`select[name="${field.name}"]`, { visible: true, timeout: timeoutTime });

                    const isDisabled = await page.evaluate((name) => {
                        const select = document.querySelector(`select[name="${name}"]`);
                        return select ? select.disabled : false;
                    }, field.name);

                    if (isDisabled) {
                        console.log(`Field "${field.name}" is disabled, skipping...`);
                        continue;
                    }

                    await page.select(`select[name="${field.name}"]`, field.input);

                } else if (field.type === "boolean") {
                    await page.waitForSelector(`label[name="${field.name}"]`, { visible: true, timeout: timeoutTime });

                    const isDisabled = await page.evaluate((name) => {
                        const labels = document.querySelectorAll(`label[name="${name}"]`);
                        return Array.from(labels).some(label => label.disabled);
                    }, field.name);

                    if (isDisabled) {
                        console.log(`Field "${field.name}" is disabled, skipping...`);
                        continue;
                    }

                    const radioButtons = await page.$$(`label[name="${field.name}"]`);

                    const clickLabel = async (index) => {
                        const label = radioButtons[index];
                        await page.evaluate((label) => {
                            label.scrollIntoView({ block: 'center', inline: 'center' });
                        }, label);
                        await label.click();
                    };

                    if (radioButtons.length > 0) {
                        const retries = 3;
                        let clicked = false;

                        for (let i = 0; i < retries; i++) {
                            try {
                                if (field.input === "0") {
                                    await clickLabel(1);
                                } else {
                                    await clickLabel(0);
                                }
                                clicked = true;
                                break;
                            } catch (err) {
                                console.log(`Retrying click for "${field.name}", attempt ${i + 1}`);
                                await page.waitForTimeout(200); // Wait before retrying
                            }
                        }

                        if (!clicked) {
                            console.log(`Failed to click the label for "${field.name}" after ${retries} attempts`);
                        }
                    }

                } else if (field.type === "checkbox") {
                    try {
                        const checkboxSelector = `label[name="${field.name}"]`;

                        await page.waitForSelector(checkboxSelector, { visible: true, timeout: timeoutTime });

                        const isDisabled = await page.evaluate((selector) => {
                            const checkbox = document.querySelector(selector);
                            return checkbox ? checkbox.disabled : false;
                        }, checkboxSelector);

                        if (isDisabled) {
                            console.log(`Field "${field.name}" is disabled, skipping...`);
                            continue;
                        }

                        await page.evaluate((selector) => {
                            const checkbox = document.querySelector(selector);
                            if (checkbox) {
                                checkbox.scrollIntoView();
                            }
                        }, checkboxSelector);

                        const checkbox = await page.$(checkboxSelector);
                        if (!checkbox) {
                            throw new Error(`Checkbox "${field.name}" not found`);
                        }

                        const isChecked = await page.evaluate((checkbox) => checkbox.checked, checkbox);

                        if (isChecked !== field.input) {
                            await checkbox.click();
                            console.log(`Checkbox "${field.name}" clicked`);
                        }

                    } catch (error) {
                        console.error(`Error processing checkbox "${field.name}": ${error.message}`);
                    }
                } else if (field.type === "file") {
                    await page.waitForSelector(`input[type="file"][name="${field.name}"]`, { visible: true });

                    const filePath = './20190.jpg';
                    const inputHandle = await page.$(`input[type="file"][name="${field.name}"]`);

                    await inputHandle.uploadFile(filePath);
                } else if (field.type === "number") {
                    await page.waitForSelector(`input[name="${field.name}"]`, { visible: true, timeout: timeoutTime });

                    const isDisabled = await page.evaluate((name) => {
                        const input = document.querySelector(`input[name="${name}"]`);
                        return input ? input.disabled : false;
                    }, field.name);

                    if (isDisabled) {
                        console.log(`Field "${field.name}" is disabled, skipping...`);
                        continue;
                    }
                    await page.type(`input[name="${field.name}"]`, '');
                    await page.type(`input[name="${field.name}"]`, field.input.toString());
                    /* await page.evaluate((name, input) => {
                        const inputElement = document.querySelector(`input[name="${name}"]`);
                        inputElement.value = input;
                    }, field.name, field.input); */

                }
            } catch (error) {
                console.log(`Skipping field "${field.name}", Error: ${error.message}`);
            }
        }
    }
};
