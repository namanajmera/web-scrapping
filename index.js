import puppeteer from "puppeteer";
import fs from "fs";

// Read and parse the JSON file
const savingsGateCriteriaRawData = fs.readFileSync("./savingsGateCriteria.json");
const proposalFormRawData = fs.readFileSync("./proposalForm.json");
const savingsGateCriteria = JSON.parse(savingsGateCriteriaRawData);
const proposalForm = JSON.parse(proposalFormRawData);

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
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 50000)));
    await page.waitForSelector('#submit-sq', { visible: true, timeout: 50000 });
    await page.click("#submit-sq");
    await page.click("#submit-sq");
    await page.click("#submit-sq");

    // Checkout
    await page.waitForSelector('#checked-out', { visible: true, timeout: 10000 });
    await page.click("#checked-out");

    // Proposal Form
    await page.waitForSelector("#relationWithLA", {
        visible: true,
    });
    await fillFormFields(page, proposalForm);
    console.log('done form page')
    await page.click("#submit-proposal-form");
};

scarpping();

const fillFormFields = async (page, formData) => {
    for (const key of Object.keys(formData)) {
        const fields = formData[key];
        for (const field of fields) {
            try {
                if (field.type === "text" || field.type === "currency") {
                    await page.waitForSelector(`input[name="${field.name}"]`, { visible: true, timeout: 500 });

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
                    await page.waitForSelector(`select[name="${field.name}"]`, { visible: true, timeout: 500 });

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
                    await page.waitForSelector(`label[name="${field.name}"]`, { visible: true, timeout: 500 });

                    const isDisabled = await page.evaluate((name) => {
                        const labels = document.querySelectorAll(`label[name="${name}"]`);
                        return Array.from(labels).some(label => label.disabled);
                    }, field.name);

                    if (isDisabled) {
                        console.log(`Field "${field.name}" is disabled, skipping...`);
                        continue;
                    }

                    const radioButtons = await page.$$(`label[name="${field.name}"]`);
                    if (radioButtons.length > 0) {
                        field.input === "0" ? await radioButtons[1].click() : await radioButtons[0].click();
                    }

                } else if (field.type === "checkbox") {
                    await page.waitForSelector(`input[type="checkbox"][name="${field.name}"]`, { visible: true, timeout: 500 });

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
