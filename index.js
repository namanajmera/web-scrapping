import puppeteer from "puppeteer";
import fs from "fs";

// Read and parse the JSON file
const rawData = fs.readFileSync("./savingsGateCriteria.json");
const savingsGateCriteria = JSON.parse(rawData);

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
    console.log('successfully');
    /*  try {
         await page.evaluate(() => {
             console.log(' successfully111');
             const button = document.querySelector('#submit-sq');
             console.log('button', button)
             if (button) { 
                 console.log('Button clicked successfully');
                 button.click(); 
             }
         });
     } catch (error) {
         console.log('Button Not clicked successfully');
     } */
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 50000)));
    await page.waitForSelector('#submit-sq', { visible: true, timeout: 50000 });
    await page.click("#submit-sq");
    await page.click("#submit-sq");
    await page.click("#submit-sq");
    await page.waitForSelector('#checked-out', { visible: true, timeout: 10000 });
    await page.click("#checked-out");

};

scarpping();

const fillFormFields = async (page, savingsGateCriteria) => {
    for (const key of Object.keys(savingsGateCriteria)) {
        const fields = savingsGateCriteria[key];
        for (const field of fields) {
            try {
                if (field.type === "text" || field.type === "currency") {
                    await page.waitForSelector(`input[name="${field.name}"]`, {
                        visible: true,
                        timeout: 1000,
                    });
                    await page.evaluate((name) => {
                        document.querySelector(`input[name="${name}"]`).value = "";
                    }, field.name);
                    await page.type(`input[name="${field.name}"]`, field.input);
                } else if (field.type === "single-select") {
                    await page.waitForSelector(`select[name="${field.name}"]`, {
                        visible: true,
                        timeout: 1000,
                    });
                    await page.evaluate((name) => {
                        document.querySelector(`select[name="${name}"]`).value = "";
                    }, field.name);
                    await page.select(`select[name="${field.name}"]`, field.input);
                } else if (field.type === "boolean") {
                    await page.waitForSelector(`label[name="${field.name}"]`, { visible: true, timeout: 1000 });
                    const radioButton = await page.$$(`label[name="${field.name}"]`);
                    if (radioButton) {
                        field.input === "0" ? await radioButton[1].click() : await radioButton[0].click();
                    }
                }
            } catch (error) {
                console.log(`Skipping field : ${field.name}, Error: ${error.message}`);
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

/* else if (field.type === "boolean") {
        await page.waitForSelector(
          `input[name="${field.name}"][value="${field.input}"]`,
          {
            visible: true,
          }
        );
        await page.click(`input[name="${field.name}"][value="${field.input}"]`);
      } */
