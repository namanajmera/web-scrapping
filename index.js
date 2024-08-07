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

    // Proposal Form
    const proposalForm1RawData = fs.readFileSync("./proposalFormData/page1Form.json");
    const proposalFormPage1 = JSON.parse(proposalForm1RawData);
    await page.waitForSelector("#relationWithLA", {
        visible: true,
    });
    console.log('Start page 1')
    await fillFormFields(page, proposalFormPage1);
    console.log('done form page 1')
    await page.click("#submit");

    const proposalForm2RawData = fs.readFileSync("./proposalFormData/page2Form.json");
    const proposalFormPage2 = JSON.parse(proposalForm2RawData);
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 10000)));
    console.log('Start page 2')
    await fillFormFields(page, proposalFormPage2);
    console.log('done form page2')
    /*     await page.evaluate(() => {
            const button = document.getElementsByTagName('button');
            console.log('button =>', button);
            if (button) button.submit.click();
        }) */

    // Page 3
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 10000)));
    const proposalForm3RawData = fs.readFileSync("./proposalFormData/page3Form.json");
    const proposalFormPage3 = JSON.parse(proposalForm3RawData);
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 10000)));
    console.log('Start page 3')
    await fillFormFields(page, proposalFormPage3);
    console.log('done form page3')

    // Page 4
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 10000)));
    const proposalForm4RawData = fs.readFileSync("./proposalFormData/page4Form.json");
    const proposalFormPage4 = JSON.parse(proposalForm4RawData);
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 10000)));
    console.log('Start page 4')
    await fillFormFields(page, proposalFormPage4, 2000);
    console.log('done form page 4')

    // Page 5
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 10000)));
    const proposalForm5RawData = fs.readFileSync("./proposalFormData/page5Form.json");
    const proposalFormPage5 = JSON.parse(proposalForm5RawData);
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 10000)));
    console.log('Start page 5')
    await fillFormFields(page, proposalFormPage5, 1500);
    console.log('done form page 5')

    // Page 6
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 10000)));
    const proposalForm6RawData = fs.readFileSync("./proposalFormData/page6Form.json");
    const proposalFormPage6 = JSON.parse(proposalForm6RawData);
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 10000)));
    console.log('Start page 6')
    await fillFormFields(page, proposalFormPage6);
    console.log('done form page 6')
};

scarpping();

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
                    await page.waitForSelector(`input[type="checkbox"][name="${field.name}"]`, { visible: true, timeout: timeoutTime });

                    const isDisabled = await page.evaluate((name) => {
                        const checkbox = document.querySelector(`input[type="checkbox"][name="${name}"]`);
                        return checkbox ? checkbox.disabled : false;
                    }, field.name);

                    if (isDisabled) {
                        console.log(`Field "${field.name}" is disabled, skipping...`);
                        continue;
                    }

                    const checkbox = await page.$(`input[type="checkbox"][name="${field.name}"]`);
                    if (checkbox) {
                        const isChecked = await page.evaluate(checkbox => checkbox.checked, checkbox);
                        if (isChecked !== field.input) {
                            await checkbox.click();
                        }
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



/* const getResponseData = async (page, endPoint) => {
  return new Promise((resolve, reject) => {
    page.on("response", async (response) => {
      const url = response.url();

      // Ensure we only handle the desired endpoint
      if (url.includes(endPoint)) {
        try {
          const json = await response; // Attempt to parse JSON
          console.log('json', json)
          resolve(json);
        } catch (error) {
          reject(new Error(`Failed to parse response body: ${error.message}`));
        }
      }
    });

    // Optionally, set a timeout to avoid waiting indefinitely
    setTimeout(() => {
      reject(new Error(`Response not received for endpoint: ${endPoint}`));
    }, 10000); // Adjust the timeout as needed
  });
}; */
