import axios from "axios";
import fs from "fs";
const path = './proposalForm.json';

async function fetchData() {
    try {
        let config = {
            method: "get",
            maxBodyLength: Infinity,
            url: "https://dev.insurance.api.1silverbullet.tech/v2/lifesave/proposal?product_id=FGPlus&manufacturer_id=TATA&version=1",
            headers: {
                Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJQQVlMT0FEIjp7ImV4dGVybmFsUmVmZXJlbmNlSWQiOiIiLCJyZWdpb25JZCI6IiIsInJvbGVJZCI6IjIiLCJ1c2VyaWQiOiI4OTI1IiwidXNlclR5cGUiOiJBQyIsImJyYW5jaElkIjoiIiwiY2hhbm5lbFR5cGUiOiIiLCJjdXN0b21lclR5cGUiOiIiLCJlbWFpbElkIjoiIiwidHJhbnNhY3Rpb25JZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCIsImpvdXJuZXlfaWQiOiIiLCJybUNvZGUiOiIiLCJ2YXJGaWVsZHMiOltdfSwiZXhwaXJlcyI6MTcyMjU4NDc5OC4yNDY3NDV9.WhwhVSSI1hJ2iMx7AE00yWA-KYHE0cVeHonNQnwbhAI",
            },
        };

        const response = await axios.request(config);
        const extractedValue = response.data.data.fieldGroups;
        const excludeNames = ["traceInfo", "distributor"];
        const formData = {};

        // Function to process fields and field groups
        const processFields = (fields, parentName) => {
            if (!formData[parentName]) {
                formData[parentName] = [];
            }
            Object.keys(fields).forEach((field) => {
                const fieldData = fields[field];
                const newData = {
                    name: fieldData.name,
                    input: fieldData.value && fieldData.value.length > 0 ? fieldData.value[0].Value : "test",
                    type: fieldData.type,
                    value: fieldData.value
                };
                formData[parentName].push(newData);
            });
        };

        Object.keys(extractedValue).forEach((key) => {
            const group = extractedValue[key];
            if (!excludeNames.includes(group.name)) {
                if (group.fieldGroups) {
                    const nestedFieldGroups = group.fieldGroups;
                    Object.keys(nestedFieldGroups).forEach((nestedKey) => {
                        const nestedGroup = nestedFieldGroups[nestedKey];
                        if (nestedGroup.fields) {
                            processFields(nestedGroup.fields, group.name);
                        }
                    });
                } else if (group.fields) {
                    processFields(group.fields, group.name);
                }
            }
        });
        // Write the formData to the JSON file
        fs.writeFile(path, JSON.stringify(formData, null, 2), 'utf8', (err) => {
            if (err) {
                console.error("Error writing to file:", err);
            } else {
                console.log("formData successfully written to proposalForm.json");
            }
        });
    } catch (error) {
        console.error("There was an error with the fetch operation:", error);
    }
}

// Call the async function
fetchData();
