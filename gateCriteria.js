const data = {
    eligibilityMapping: {
        fieldGroups: {
            personalInformation: {
                id: 475,
                name: "personalInformation",
                description: "Section to capture personal details of the Insured",
                parent: null,
                label: "Personal Details of First life Assured",
                visibility: null,
                order: 2,
                fields: {
                    relationWithFirstLifeAssured: {
                        id: "4058",
                        label: "Relation with Life Assured",
                        name: "relationWithFirstLifeAssured",
                        description:
                            "Relationship of proposer with first or primary life assured.",
                        mandatory: 1,
                        type: "single-select",
                        value: [
                            {
                                Text: "Parent",
                                Value: "parent",
                            },
                            {
                                Text: "Self",
                                Value: "Self",
                            },
                            {
                                Text: "Spouse",
                                Value: "Spouse",
                            },
                        ],
                        default: null,
                        min: null,
                        max: null,
                        pattern: null,
                        pathType: "array",
                        basePath: "['personalInformation']['individualDetails']",
                        singleQuoteMappingCondition: [
                            {
                                key: "memberType",
                                value: "Proposer",
                            },
                        ],
                        fieldToMap: "relationWithFirstLifeAssured",
                        visibility: null,
                        validation: null,
                    },
                    firstName: {
                        id: "G4",
                        label: "First Name as per official ID (PAN)",
                        name: "firstName",
                        description:
                            "Name cannot contain special characters or numbers #Enter Valid Name same as ID Proof excluding special characters ",
                        mandatory: 1,
                        type: "text",
                        value: null,
                        default: null,
                        min: 1,
                        max: 20,
                        pattern: "/^([a-zA-Z\\ \\'])*$/",
                        pathType: "array",
                        basePath: "['personalInformation']['individualDetails']",
                        singleQuoteMappingCondition: [
                            {
                                key: "memberType",
                                value: "Life Assured",
                            },
                            {
                                key: "relationWithFirstLifeAssured",
                                value: "Self",
                            },
                        ],
                        fieldToMap: "firstName",
                        visibility: null,
                        validation: null,
                    },
                    middleName: {
                        id: "4056",
                        label: "Middle Name as per official ID (PAN)",
                        name: "middleName",
                        description:
                            "Name cannot contain special characters or numbers #Enter Valid Name same as ID Proof excluding special characters",
                        mandatory: 0,
                        type: "text",
                        value: null,
                        default: null,
                        min: 1,
                        max: 15,
                        pattern: "/^[A-Za-z\\\\s]+$/",
                        pathType: "array",
                        basePath: "['personalInformation']['individualDetails']",
                        singleQuoteMappingCondition: [
                            {
                                key: "memberType",
                                value: "Life Assured",
                            },
                            {
                                key: "relationWithFirstLifeAssured",
                                value: "Self",
                            },
                        ],
                        fieldToMap: "middleName",
                        visibility: null,
                        validation: null,
                    },
                    lastName: {
                        id: "G5",
                        label: "Last Name as per official ID (PAN)",
                        name: "lastName",
                        description:
                            "Name cannot contain special characters or numbers #Enter Valid Name same as ID Proof excluding special characters ",
                        mandatory: 1,
                        type: "text",
                        value: null,
                        default: null,
                        min: 1,
                        max: 20,
                        pattern: "/^([a-zA-Z\\.])*$/",
                        pathType: "array",
                        basePath: "['personalInformation']['individualDetails']",
                        singleQuoteMappingCondition: [
                            {
                                key: "memberType",
                                value: "Life Assured",
                            },
                            {
                                key: "relationWithFirstLifeAssured",
                                value: "Self",
                            },
                        ],
                        fieldToMap: "lastName",
                        visibility: null,
                        validation: null,
                    },
                    gender: {
                        id: "G11",
                        label: "Gender",
                        name: "gender",
                        description: null,
                        mandatory: 1,
                        type: "single-select",
                        value: [
                            {
                                Text: "Male",
                                Value: "Male",
                            },
                            {
                                Text: "Female",
                                Value: "Female",
                            },
                        ],
                        default: null,
                        min: null,
                        max: null,
                        pattern: null,
                        pathType: "array",
                        basePath: "['personalInformation']['individualDetails']",
                        singleQuoteMappingCondition: [
                            {
                                key: "memberType",
                                value: "Life Assured",
                            },
                            {
                                key: "relationWithFirstLifeAssured",
                                value: "Self",
                            },
                        ],
                        fieldToMap: "gender",
                        visibility: null,
                        validation: null,
                    },
                    education: {
                        id: "G3",
                        label: "Education",
                        name: "education",
                        description: "Select Educational Qualification",
                        mandatory: 1,
                        type: "single-select",
                        value: [
                            {
                                Text: "SSC",
                                Value: "10Th",
                            },
                            {
                                Text: "HSC",
                                Value: "12Th",
                            },
                            {
                                Text: "Graduate and above",
                                Value: "graduate",
                            },
                            {
                                Text: "Post Graduate",
                                Value: "postGraduate",
                            },
                        ],
                        default: null,
                        min: null,
                        max: null,
                        pattern: null,
                        pathType: "array",
                        basePath: "['personalInformation']['individualDetails']",
                        singleQuoteMappingCondition: [
                            {
                                key: "memberType",
                                value: "Life Assured",
                            },
                            {
                                key: "relationWithFirstLifeAssured",
                                value: "Self",
                            },
                        ],
                        fieldToMap: "qualification",
                        visibility: null,
                        validation: "",
                    },
                    occupation: {
                        id: "G10",
                        label: "Occupation",
                        name: "occupation",
                        description: null,
                        mandatory: 1,
                        type: "single-select",
                        value: [
                            {
                                Text: "Salaried",
                                Value: "salaried",
                            },
                            {
                                Text: "Self Employed",
                                Value: "selfEmployed",
                            },
                        ],
                        default: null,
                        min: null,
                        max: null,
                        pattern: null,
                        pathType: "array",
                        basePath: "['personalInformation']['individualDetails']",
                        singleQuoteMappingCondition: [
                            {
                                key: "memberType",
                                value: "Life Assured",
                            },
                            {
                                key: "relationWithFirstLifeAssured",
                                value: "Self",
                            },
                        ],
                        fieldToMap: "occupation",
                        visibility: null,
                        validation: null,
                    },
                    dateOfBirth: {
                        id: "G12",
                        label: "Date of Birth",
                        name: "dateOfBirth",
                        description: null,
                        mandatory: 1,
                        type: "date",
                        value: null,
                        default: null,
                        min: null,
                        max: null,
                        pattern: null,
                        pathType: "array",
                        basePath: "['personalInformation']['individualDetails']",
                        singleQuoteMappingCondition: [
                            {
                                key: "memberType",
                                value: "Life Assured",
                            },
                            {
                                key: "relationWithFirstLifeAssured",
                                value: "Self",
                            },
                        ],
                        fieldToMap: "dateOfBirth",
                        visibility: null,
                        validation:
                            "new Date(formInfo['fieldGroups']['personalInformation']['fields']['dateOfBirth']['input']) >= new Date(new Date().setFullYear(new Date().getFullYear() - 61, new Date().getMonth(), new Date().getDate()))",
                    },
                    doYouConsumeTobacco: {
                        id: "S19",
                        label: "Do you consume tobacco products?",
                        name: "doYouConsumeTobacco",
                        description: "Do you consume tobacco products?",
                        mandatory: 1,
                        type: "single-select",
                        value: [
                            {
                                Text: "No",
                                Value: "No",
                            },
                            {
                                Text: "Yes",
                                Value: "Yes",
                            },
                        ],
                        default: null,
                        min: null,
                        max: null,
                        pattern: null,
                        pathType: "array",
                        basePath: "['personalInformation']['individualDetails']",
                        singleQuoteMappingCondition: [
                            {
                                key: "memberType",
                                value: "Life Assured",
                            },
                            {
                                key: "relationWithFirstLifeAssured",
                                value: "Self",
                            },
                        ],
                        fieldToMap: "tobacco",
                        visibility:
                            "((new Date() - new Date(formInfo['fieldGroups']['personalInformation']['fields']['dateOfBirth']['input']))/1000/60/60/24/365) > 18.01",
                        validation: null,
                    },
                    annualIncome: {
                        id: "3807",
                        label: "Annual Income",
                        name: "annualIncome",
                        description: "Please select your Income range",
                        mandatory: 1,
                        type: "currency",
                        value: null,
                        default: null,
                        min: 0,
                        max: 999999999,
                        pattern: null,
                        pathType: "array",
                        basePath: "['personalInformation']['individualDetails']",
                        singleQuoteMappingCondition: [
                            {
                                key: "memberType",
                                value: "Life Assured",
                            },
                            {
                                key: "relationWithFirstLifeAssured",
                                value: "Self",
                            },
                        ],
                        fieldToMap: "annualIncome",
                        visibility: null,
                        validation: null,
                    },
                    zipCode: {
                        id: "AB8",
                        label: "Pincode",
                        name: "zipCode",
                        description:
                            "Maximum 6 Numbers for Indian and 10 for NRI/OCI/PIO/FN #Zip Code of the area provided",
                        mandatory: 1,
                        type: "text",
                        value: null,
                        default: null,
                        min: 6,
                        max: 6,
                        pattern: "/^[1-9][0-9]{5}$/",
                        pathType: "array",
                        basePath: "['personalInformation']['individualDetails']",
                        singleQuoteMappingCondition: [
                            {
                                key: "memberType",
                                value: "Life Assured",
                            },
                            {
                                key: "relationWithFirstLifeAssured",
                                value: "Self",
                            },
                        ],
                        fieldToMap: "zipCode",
                        visibility: null,
                        validation: null,
                    },
                    emailId: {
                        id: "G9",
                        label: "Email Id",
                        name: "emailId",
                        description: "Email ID Example abc@example.com",
                        mandatory: 1,
                        type: "text",
                        value: null,
                        default: null,
                        min: 1,
                        max: 100,
                        pattern: "/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/",
                        pathType: "array",
                        basePath: "['personalInformation']['individualDetails']",
                        singleQuoteMappingCondition: [
                            {
                                key: "memberType",
                                value: "Life Assured",
                            },
                            {
                                key: "relationWithFirstLifeAssured",
                                value: "Self",
                            },
                        ],
                        fieldToMap: "email",
                        visibility: null,
                        validation: null,
                    },
                },
            },
            suitabilityDetail: {
                id: 479,
                name: "suitabilityDetail",
                description: "Suitability Analysis",
                parent: null,
                label: "Suitability Analysis",
                visibility: null,
                order: 4,
                fields: {
                    isSuitabilityDone: {
                        id: "S14",
                        label: "Do you wish to undergo Suitability Analysis ?",
                        name: "isSuitabilityDone",
                        description: null,
                        mandatory: 1,
                        type: "boolean",
                        value: null,
                        default: null,
                        min: null,
                        max: null,
                        pattern: null,
                        pathType: "array",
                        basePath: "['product']['suitability']",
                        singleQuoteMappingCondition: [],
                        fieldToMap: "isSuitabilityDone",
                        visibility:
                            "( formInfo['fieldGroups']['distributor']['fields']['channelType']['input'] === 'B2C' )",
                        validation: null,
                    },
                    lifeStage: {
                        id: "S2",
                        label: "Life Stage",
                        name: "lifeStage",
                        description: null,
                        mandatory: 1,
                        type: "single-select",
                        value: [
                            {
                                Text: "Married",
                                Value: "Married",
                            },
                            {
                                Text: "Married with childern",
                                Value: "Married with childern",
                            },
                            {
                                Text: "Married with older childern",
                                Value: "Married with older childern",
                            },
                            {
                                Text: "Nearing retirement",
                                Value: "Nearing retirement",
                            },
                            {
                                Text: "Retired",
                                Value: "Retired",
                            },
                            {
                                Text: "Single",
                                Value: "Single",
                            },
                        ],
                        default: null,
                        min: null,
                        max: null,
                        pattern: null,
                        pathType: "string",
                        basePath: "['product']['suitability']",
                        singleQuoteMappingCondition: [],
                        fieldToMap: "lifeStageOfProposer",
                        visibility:
                            "( formInfo['fieldGroups']['suitabilityDetail']['fields']['isSuitabilityDone']['input'] == '1' )",
                        validation: null,
                    },
                    financialAndFamilyGoals: {
                        id: "G16",
                        label: "Financial and Family Goals",
                        name: "financialAndFamilyGoals",
                        description: null,
                        mandatory: 1,
                        type: "single-select",
                        value: [
                            {
                                Text: "Child Future",
                                Value: "Child Future",
                            },
                            {
                                Text: "Life Protection",
                                Value: "Life Protection",
                            },
                            {
                                Text: "Regular Income",
                                Value: "Regular Income",
                            },
                            {
                                Text: "Retirement Planning",
                                Value: "Retirement Planning",
                            },
                            {
                                Text: "Wealth Creation",
                                Value: "Wealth Creation",
                            },
                        ],
                        default: null,
                        min: null,
                        max: null,
                        pattern: null,
                        pathType: "string",
                        basePath: "['product']['suitability']",
                        singleQuoteMappingCondition: [],
                        fieldToMap: "goalsOfProposer",
                        visibility:
                            "( formInfo['fieldGroups']['suitabilityDetail']['fields']['isSuitabilityDone']['input'] == '1' )",
                        validation:
                            "(formInfo['fieldGroups']['suitabilityDetail']['fields']['financialAndFamilyGoals']['input'] == 'Child Future' && Math.floor((new Date() - new Date(formInfo['fieldGroups']['personalInformation']['fields']['dateOfBirth']['input']))/1000/60/60/24/365) >= 0 && Math.floor((new Date() - new Date(formInfo['fieldGroups']['personalInformation']['fields']['dateOfBirth']['input']))/1000/60/60/24/365) <= 17) || (['Retirement Planning','Wealth Creation'].includes(formInfo['fieldGroups']['suitabilityDetail']['fields']['financialAndFamilyGoals']['input']) && Math.floor((new Date() - new Date(formInfo['fieldGroups']['personalInformation']['fields']['dateOfBirth']['input']))/1000/60/60/24/365) >= 45 && Math.floor((new Date() - new Date(formInfo['fieldGroups']['personalInformation']['fields']['dateOfBirth']['input']))/1000/60/60/24/365) <= 999) || (formInfo['fieldGroups']['suitabilityDetail']['fields']['financialAndFamilyGoals']['input'] == 'Regular Income' && Math.floor((new Date() - new Date(formInfo['fieldGroups']['personalInformation']['fields']['dateOfBirth']['input']))/1000/60/60/24/365) >= 0 && Math.floor((new Date() - new Date(formInfo['fieldGroups']['personalInformation']['fields']['dateOfBirth']['input']))/1000/60/60/24/365) <= 60) ",
                    },
                    riskProfile: {
                        id: "G17",
                        label: "What Risk do you prefer for investment?",
                        name: "riskProfile",
                        description: null,
                        mandatory: 1,
                        type: "single-select",
                        value: [
                            {
                                Text: "High",
                                Value: "High",
                            },
                            {
                                Text: "Low",
                                Value: "Low",
                            },
                            {
                                Text: "Medium",
                                Value: "Medium",
                            },
                        ],
                        default: null,
                        min: null,
                        max: null,
                        pattern: null,
                        pathType: "string",
                        basePath: "['product']['suitability']",
                        singleQuoteMappingCondition: [],
                        fieldToMap: "riskProfileOfProposer",
                        visibility:
                            "( formInfo['fieldGroups']['suitabilityDetail']['fields']['isSuitabilityDone']['input'] == '1' )",
                        validation:
                            "(['Child Future','Regular Income','Retirement Planning','Wealth Creation'].includes(formInfo['fieldGroups']['suitabilityDetail']['fields']['financialAndFamilyGoals']['input'])&& ((formInfo['fieldGroups']['suitabilityDetail']['fields']['financialAndFamilyGoals']['input'] === 'Child Future') && (formInfo['fieldGroups']['suitabilityDetail']['fields']['riskProfile']['input']==='Low' || formInfo['fieldGroups']['suitabilityDetail']['fields']['riskProfile']['input']==='Medium')) || ((formInfo['fieldGroups']['suitabilityDetail']['fields']['financialAndFamilyGoals']['input'] === 'Regular Income') && (formInfo['fieldGroups']['suitabilityDetail']['fields']['riskProfile']['input']==='Low')) || ((formInfo['fieldGroups']['suitabilityDetail']['fields']['financialAndFamilyGoals']['input'] === 'Retirement Planning') && (formInfo['fieldGroups']['suitabilityDetail']['fields']['riskProfile']['input']==='Low')) || ((formInfo['fieldGroups']['suitabilityDetail']['fields']['financialAndFamilyGoals']['input'] === 'Wealth Creation') && (formInfo['fieldGroups']['suitabilityDetail']['fields']['riskProfile']['input']==='High')))",
                    },
                    goalHorizon: {
                        id: "G18",
                        label: "Policy Term",
                        name: "goalHorizon",
                        description: "Please enter numbers only.",
                        mandatory: 1,
                        type: "text",
                        value: null,
                        default: null,
                        min: null,
                        max: null,
                        pattern: "/^[0-9]*$/",
                        pathType: "string",
                        basePath: "['product']",
                        singleQuoteMappingCondition: [],
                        fieldToMap: "policyTerm",
                        visibility: "false",
                        validation: null,
                    },
                    insurancePortfolio: {
                        id: "G50",
                        label: "Insurance Portfolio Held",
                        name: "insurancePortfolio",
                        description: "",
                        mandatory: 1,
                        type: "boolean",
                        value: null,
                        default: null,
                        min: null,
                        max: null,
                        pattern: null,
                        pathType: "",
                        basePath: "",
                        singleQuoteMappingCondition: [],
                        fieldToMap: "",
                        visibility: "",
                        validation: "",
                    },
                    sltIns: {
                        id: "G71",
                        label: "Select Number of Policies",
                        name: "sltIns",
                        description: null,
                        mandatory: 1,
                        type: "single-select",
                        value: [
                            {
                                Text: "1",
                                Value: "1",
                            },
                            {
                                Text: "2",
                                Value: "2",
                            },
                            {
                                Text: "3",
                                Value: "3",
                            },
                            {
                                Text: "4",
                                Value: "4",
                            },
                            {
                                Text: "5",
                                Value: "5",
                            },
                        ],
                        default: null,
                        min: null,
                        max: null,
                        pattern: null,
                        pathType: "",
                        basePath: "",
                        singleQuoteMappingCondition: [],
                        fieldToMap: "",
                        visibility:
                            "formInfo['fieldGroups']['suitabilityDetail']['fields']['insurancePortfolio']['input']=='1'",
                        validation: null,
                    },
                },
            },
        },
    },
    manufacturerValidation: "No",
};

// Function to extract fields dynamically from a specified field group
const extractFieldsFromGroup = (fieldGroupName) => {
    const fieldGroup = data.eligibilityMapping.fieldGroups[fieldGroupName];
    if (!fieldGroup || !fieldGroup.fields) {
        throw new Error(`Field group "${fieldGroupName}" not found.`);
    }
    return Object.keys(fieldGroup.fields).map((key) => {
        const field = fieldGroup.fields[key];
        return {
            name: field.name,
            type: field.type,
            value: field.value,
        };
    });
};

// Example usage:
const personalInformationFields = extractFieldsFromGroup("personalInformation");
const suitabilityDetailFields = extractFieldsFromGroup("suitabilityDetail");

const newData = {
    personalInformation: personalInformationFields,
    suitabilityDetail: suitabilityDetailFields,
};
console.log(newData);
