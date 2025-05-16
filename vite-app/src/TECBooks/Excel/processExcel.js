function excelDateToJSDate(serial) {
    // Excel incorrectly assumes 1900 was a leap year, so we subtract 1 extra day
    const msPerDay = 86400000;
    const excelEpoch = new Date(1899, 11, 30); // Dec 30, 1899
    const jsDate = new Date(excelEpoch.getTime() + (serial - 1) * msPerDay + msPerDay*30);
    return jsDate;
}

function getBizInfo(overviewSheet) {
    let rawStartMonth = overviewSheet[0][6];
    let startMonthDate = excelDateToJSDate(rawStartMonth);

    // console.log(overviewSheet)
    let bizInfo = {
        name: overviewSheet[0][3],
        // startMonth: overviewSheet[0][6]
        startMonth: `${startMonthDate.getFullYear()}-${(startMonthDate.getMonth() + 1).toString().padStart(2, '0')}`
    }

    const months = []
    for (let i = 3; i < overviewSheet.length; i++) {
        months.push(overviewSheet[i][0])
    }

    bizInfo.months = months

    return bizInfo
}

function getOverviewData(overviewSheet) {
    let revCol, costsCol, expensesCol, depCol, accountsCol, totalCol;
    const revenue = [], costs = [], expenses = [], depreciation = [], accounts = [], total = [];

    // Header row is at index 2
    for (let i = 0; i < overviewSheet[2].length; i++) {
        const colName = overviewSheet[2][i];
        if (colName === 'Revenue') revCol = i;
        else if (colName === 'Costs') costsCol = i;
        else if (colName === 'Expenses') expensesCol = i;
        else if (colName === 'Depreciation') depCol = i;
        else if (colName === 'Accounts') accountsCol = i;
        else if (colName === 'Total') totalCol = i;
    }

    for (let i = 3; i < overviewSheet.length; i++) {
        const row = overviewSheet[i];
        if (!row || row.length === 0) continue; // skip empty rows

        if (revCol !== undefined) revenue.push(row[revCol]);
        if (costsCol !== undefined) costs.push(row[costsCol]);
        if (expensesCol !== undefined) expenses.push(row[expensesCol]);
        if (depCol !== undefined) depreciation.push(row[depCol]);
        if (accountsCol !== undefined) accounts.push(row[accountsCol]);
        if (totalCol !== undefined) total.push(row[totalCol]);
    }

    const overviewData = {
        revenue,
        costs,
        expenses,
        depreciation,
        accounts,
        total,
    };

    console.log(overviewData);
    return overviewData;
}

function getRevenueData(sheet) {
    const headerRow = sheet[2]; // This is the row with actual column labels
    const dataStartIndex = 3;

    const productsAndServices = {};
    const totals = [];

    let totalColIndex = null;

    // Identify the product/service columns and the "Total" column
    for (let i = 2; i < headerRow.length; i++) {
        const label = headerRow[i];

        if (!label) continue;

        if (label.toLowerCase() === "total") {
            totalColIndex = i;
        } else {
            // Treat everything else as a product or service
            const key = label.trim().toLowerCase();
            productsAndServices[key] = [];
        }
    }

    // Loop through the data rows
    for (let i = dataStartIndex; i < sheet.length; i++) {
        const row = sheet[i];

        for (const [key, _] of Object.entries(productsAndServices)) {
            // Find index by matching the original label (case-insensitive)
            const colIndex = headerRow.findIndex(col => col?.trim().toLowerCase() === key);
            productsAndServices[key].push(row[colIndex] ?? null);
        }

        if (totalColIndex !== null) {
            totals.push(row[totalColIndex] ?? null);
        }
    }

    return {
        productsAndServices,
        totals
    };
}


function getCostsData(sheet) {
    const headerRow = sheet[2]; // Row with category labels
    const columnLabels = sheet[2]; // Actual column names (like "Employee #1", "Cybersecurity", etc.)
    const dataStartIndex = 3;

    const salaries = {};
    const fixedCosts = {};
    const variableCosts = {};
    const total = [];

    // Track current categories
    let currentCategory = null;

    // Map column index to category and subkey
    const columnMap = {};

    for (let i = 2; i < headerRow.length; i++) {
        const label = columnLabels[i];

        if (!label) continue; // Skip empty labels, they're category markers

        const normalized = label.trim().toLowerCase();

        if (normalized === "salaries") currentCategory = "salaries";
        else if (normalized === "fixed costs") currentCategory = "fixedCosts";
        else if (normalized === "variable costs") currentCategory = "variableCosts";
        else if (normalized === "total") {
            currentCategory = "total";
            columnMap[i] = { category: "total" };
        }
        else if (normalized === "leftover") {
            columnMap[i] = { category: "variableCosts", subKey: "leftover" };
        }
        else if (normalized === "used") {
            columnMap[i] = { category: "variableCosts", subKey: "used" };
        }
        else if (currentCategory && currentCategory !== "total") {
            // All other labels should go under their current category
            const subKey = label.trim().replace(/\s+/g, '_');
            columnMap[i] = { category: currentCategory, subKey: subKey };
        }
    }

    // Populate data into categories
    for (let i = dataStartIndex; i < sheet.length; i++) {
        const row = sheet[i];

        for (const [colIndexStr, { category, subKey }] of Object.entries(columnMap)) {
            const colIndex = parseInt(colIndexStr);
            const value = row[colIndex] ?? null;

            if (category === "total") {
                total.push(value);
            } else {
                if (category === "salaries") {
                    if (!salaries[subKey]) salaries[subKey] = [];
                    salaries[subKey].push(value);
                } else if (category === "fixedCosts") {
                    if (!fixedCosts[subKey]) fixedCosts[subKey] = [];
                    fixedCosts[subKey].push(value);
                } else if (category === "variableCosts") {
                    if (!variableCosts[subKey]) variableCosts[subKey] = [];
                    variableCosts[subKey].push(value);
                }
            }
        }
    }

    return {
        salaries,
        fixedCosts,
        variableCosts,
        total
    };
}


function getExpensesData(sheet) {
    const headerRow = sheet[1]; // Row with category labels like "Salaries", "Expenses", etc.
    const columnLabels = sheet[1]; // Full column labels
    const dataStartIndex = 2;

    const salaries = {};
    const expenses = {};
    const total = [];

    let currentCategory = null;
    const columnMap = {};

    for (let i = 2; i < headerRow.length; i++) {
        const label = columnLabels[i];
        if (!label) continue;

        const normalized = label.trim().toLowerCase();

        if (normalized === "salaries") {
            currentCategory = "salaries";
        } else if (normalized === "expenses") {
            currentCategory = "expenses";
        } else if (normalized === "total") {
            currentCategory = "total";
            columnMap[i] = { category: "total" };
        } else if (currentCategory === "salaries") {
            columnMap[i] = { category: "salaries", subKey: label.trim().replace(/\s+/g, "_") };
        } else if (currentCategory === "expenses") {
            columnMap[i] = { category: "expenses", subKey: label.trim().replace(/\s+/g, "_") };
        }
    }

    for (let i = dataStartIndex; i < sheet.length; i++) {
        const row = sheet[i];

        for (const [colIndexStr, { category, subKey }] of Object.entries(columnMap)) {
            const colIndex = parseInt(colIndexStr);
            const value = row[colIndex] ?? null;

            if (category === "total") {
                total.push(value);
            } else if (category === "salaries") {
                if (!salaries[subKey]) salaries[subKey] = [];
                salaries[subKey].push(value);
            } else if (category === "expenses") {
                if (!expenses[subKey]) expenses[subKey] = [];
                expenses[subKey].push(value);
            }
        }
    }

    return {
        salaries,
        expenses,
        total
    };
}


export const processExcelData = (initialData) => {
    // console.log(initialData)

    const overviewSheet = initialData.Overview
    const bizInfo = getBizInfo(overviewSheet)

    const overviewData = getOverviewData(overviewSheet)

    const revenueSheet = initialData.Revenue
    const revenueData = getRevenueData(revenueSheet)

    const costsSheet = initialData.Costs
    const costsData = getCostsData(costsSheet)

    const expensesSheet = initialData.Expenses
    const expensesData = getExpensesData(expensesSheet)

    // console.log("Results of processing")
    // console.log(bizInfo)
    // console.log(overviewData)
    // console.log(revenueData)
    // console.log(costsData)
    // console.log(expensesData)

    return [bizInfo, overviewData, revenueData, costsData, expensesData]
}
