import axios from "axios";
import fs from "fs";
const path = './proposalForm.json';

async function fetchData() {
    try {
        let config = {
            method: "get",
            maxBodyLength: Infinity,
            url: "https://dev.insurance.api.1silverbullet.tech/v2/lifesave/proposal/draft?journey_id=9172cf36-40e9-4b34-9d83-02596211ca69",
            headers: {
                Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJQQVlMT0FEIjp7ImV4dGVybmFsUmVmZXJlbmNlSWQiOiIiLCJyZWdpb25JZCI6IiIsInJvbGVJZCI6IjIiLCJ1c2VyaWQiOiI4OTI1IiwidXNlclR5cGUiOiJBQyIsImJyYW5jaElkIjoiIiwiY2hhbm5lbFR5cGUiOiIiLCJjdXN0b21lclR5cGUiOiIiLCJlbWFpbElkIjoiIiwidHJhbnNhY3Rpb25JZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCIsImpvdXJuZXlfaWQiOiIiLCJybUNvZGUiOiIiLCJ2YXJGaWVsZHMiOltdfSwiZXhwaXJlcyI6MTcyMzA0MDM5My4yNjIzMjIyfQ.VLGctllNby0CUU7HbrJCE771ADuPC--P8vycFqUdQlY",
            },
        };

        const response = await axios.request(config);
        const extractedValue = response.data.data.proposal.proposal_json.fieldGroups;
        const excludeNames = ["traceInfo", "distributor"];
        const formData = {};

        const processFields = (fields, parentName) => {
            if (!formData[parentName]) {
                formData[parentName] = [];
            }
            Object.keys(fields).forEach((field) => {
                const fieldData = fields[field];
                // Ensure that fieldData.value is an array and handle it properly
                if(fieldData.input){
                    const newData = {
                        name: fieldData.name,
                        input: fieldData.type === 'file' ? '' : fieldData.input,
                        type: fieldData.type,
                    };
                    formData[parentName].push(newData);
                }
            });
        };

        const processNestedGroups = (nestedGroups, parentName) => {
            Object.keys(nestedGroups).forEach((nestedKey) => {
                const nestedGroup = nestedGroups[nestedKey];
                if (nestedGroup.fields) {
                    processFields(nestedGroup.fields, parentName);
                } else if (nestedGroup.fieldGroups) {
                    // Process further nested field groups
                    processNestedGroups(nestedGroup.fieldGroups, parentName);
                }
            });
        };

        Object.keys(extractedValue).forEach((key) => {
            const group = extractedValue[key];
            if (!excludeNames.includes(group.name)) {
                if (group.fieldGroups) {
                    // Process nested field groups
                    processNestedGroups(group.fieldGroups, group.name);
                }
                if (group.fields) {
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
