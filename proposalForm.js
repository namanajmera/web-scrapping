var extractedValue = pm.response.json().data.fieldGroups;
const excludeNames = ['traceInfo', 'distributor'];
const data = {};

// Function to process fields and field groups
const processFields = (fields, parentName) => {
    if (!data[parentName]) {
        data[parentName] = [];
    }
    Object.keys(fields).forEach(field => {
        const fieldData = fields[field];
        const newData = {
            name: fieldData.name,
            input: '',
            type: fieldData.type,
        };
        data[parentName].push(newData);
    });
};

Object.keys(extractedValue).forEach(key => {
    const group = extractedValue[key];
    if (!excludeNames.includes(group.name)) {
        if (group.fieldGroups) {
            const nestedFieldGroups = group.fieldGroups;
            Object.keys(nestedFieldGroups).forEach(nestedKey => {
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

console.log(JSON.stringify(data));
