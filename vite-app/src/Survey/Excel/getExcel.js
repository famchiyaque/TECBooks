function getOverviewSheet(bizInfo, startMonth, months) {
    const data = [[], ['', 'Overview', '', 'Name', bizInfo.name, '', 'Start', startMonth], []]

    data.push(['', 'Months', 'Revenue', 'Costs', 'Expenses', 'Depreciation', 'Accounts', 'Total'])

    months.forEach((month) => {
        data.push(['', month]);
    });

    return data
};

function getRevenueSheet(revenue, months) {
    const productsList = revenue.filter(rev => rev.status === "Product");
    const servicesList = revenue.filter(rev => rev.status === "Service");

    const data = [[], ['', 'Revenue'], []];

    const titlesRow = ['', 'Months'];
    if (productsList.length > 0) {
        titlesRow.push('Products');
        for (let i = 0; i < productsList.length; i++) {
            titlesRow.push(productsList[i].name);
        };
    };
    if (servicesList.length > 0) {
        titlesRow.push('Services');
        for (let i = 0; i < servicesList.length; i++) {
            titlesRow.push(servicesList[i].name);
        };
    };
    titlesRow.push('Total');
    data.push(titlesRow);

    months.forEach((month) => {
        data.push(['', month]);
    });

    // console.log("Revenue Sheet", data);
    return data;
};

function getCostsSheet(employeesInfo, assetsInfo, months) {
    const data = [[], ['','Costs'], []];

    const empProduction = employeesInfo.empProduction;

    const titlesRow = ['', 'Months'];
    if (empProduction > 0) {
        titlesRow.push('Salaries');
        for (let i = 0; i < empProduction; i++) {
            titlesRow.push("Employee #" + (i+1));
        };
    };

    const rentedAssets = assetsInfo.assets.filter(asset => asset.status === 'Rented');
    if (rentedAssets.length > 0) {
        titlesRow.push('Fixed Costs');
        for (let i = 0; i < rentedAssets.length; i++) {
            titlesRow.push(rentedAssets[i].name);
        };
    };

    if (assetsInfo.hasInventory) {
        titlesRow.push('Variable Costs');
        if (assetsInfo.hasRW) {
            titlesRow.push('Raw Materials');
            titlesRow.push('Used')
        }
    };
    titlesRow.push('Leftover', 'Total');
    data.push(titlesRow);

    months.forEach((month) => {
        data.push(['', month]);
    });

    // console.log("Costs Sheet", data);
    return data;
};

function getOwnedAssetsSheet(assetsInfo, months) {
    const data = [[], ['', 'Expenses of Owned Assets'], []]

    const ownedAssets = assetsInfo.assets.filter(asset => asset.status === 'Owned')

    const titlesRow = ['', 'Name', 'Type', 'Month Acquired', 'Initial Value', 'Lifetime (yrs)', 'Dep. Rate', 'Monthly Dep.', 'Yearly Dep.']
    data.push(titlesRow)

    if (ownedAssets.length > 0) {
        for (let i = 0; i < ownedAssets.length; i++) {
            const newRow = ['', ownedAssets[i].name, ownedAssets[i].type, ownedAssets[i].dateAcq]
            data.push(newRow)
        }
    } else {
        data.push(['', 'No depreciable assets, you can disregard this page'])
    }

    // console.log("Owned Assets Sheet, ", data)
    return data
};

function getExpensesSheet(employeesInfo, expenses, months) {
    const data = [[], ['', 'Expenses']];

    const empAdmin = employeesInfo.empAdmin

    const titlesRow = ['', 'Months'];
    if (empAdmin > 0) {
        titlesRow.push('Salaries');
        for (let i = 0; i < empAdmin; i++) {
            titlesRow.push("Employee #" + (i+1));
        };
    };

    const expensesArr = expenses.expenses
    // console.log(expensesArr)
    if (expensesArr.length > 0) {
        titlesRow.push('Expenses');
        for (let i = 0; i < expensesArr.length; i++) {
            titlesRow.push(expensesArr[i].name);
        }
    };
    titlesRow.push('Total');
    data.push(titlesRow);

    months.forEach((month) => {
        data.push(['', month]);
    });

    // console.log("Expenses Sheet", data);
    return data;
};

function getAccountsSheet(accountInfo, months) {
    const data = [[], ['', 'Liabilities and Receivables'], []]

    const titlesRow = ['', 'Months', 'Month Started']
    if (accountInfo.accsPayable.length > 0) {
        titlesRow.push('Payables')
        for (let i = 0; i < accountInfo.accsPayable.length; i++) {
            titlesRow.push(accountInfo.accsPayable[i].name)
        }
    }
    if (accountInfo.accsReceivable.length > 0) {
        titlesRow.push('Receivables')
        for (let i = 0; i < accountInfo.accsPayable.length; i++) {
            titlesRow.push(accountInfo.accsReceivable[i].name)
        }
    }
    data.push(titlesRow)

    const allAccs = accountInfo.accsPayable.concat(accountInfo.accsReceivable)

    months.forEach((month) => {
        const newRow = ['', month, ''];
        // const monthNum = new Date(month).getMonth() + 1;
        // console.log(month)
        // allAccs.forEach((acc, idx) => {
        //     if (acc.date === monthNum) {
        //         for (let i = 0; i < idx; i++) {
        //             newRow.push('');
        //         }
        //         newRow.push('start');
        //     }
        // });
        data.push(newRow);
    });

    // console.log("Accounts Sheet: ", data)
    return data
};

export const getExcelData = (surveyInfo) => {
    const bizInfo = surveyInfo.bizInfo;
    const revenue = surveyInfo.revenueInfo.revenue;
    const employeesInfo = surveyInfo.employeesInfo;
    const assetsInfo = surveyInfo.assetsInfo;
    const expenses = surveyInfo.expensesInfo;
    const accountsInfo = surveyInfo.accountsInfo;
    // console.log(bizInfo)
    // console.log(revenue)
    // console.log(employeesInfo)
    // console.log(assetsInfo)
    // console.log(expenses)
    // console.log(accountsInfo)

    const startMonth = bizInfo.startMonth;
    // console.log(startMonth)

    const getMonthNames = (startMonth) => {
        const [year, month] = startMonth.split('-').map(Number);
        const startDate = new Date(year, month - 1, 1); // Use local time
        const currentDate = new Date();
    
        const months = [];
        let tempDate = new Date(startDate); // Clone to avoid mutation
    
        while (tempDate <= currentDate) {
            months.push(tempDate.toLocaleString('default', { month: 'long', year: 'numeric' }));
            tempDate.setMonth(tempDate.getMonth() + 1);
        }
    
        return months.reverse();
    };
    
    

    const months = getMonthNames(startMonth);
    // console.log(months)

    const overviewData = getOverviewSheet(bizInfo, startMonth, months)
    const revenueData = getRevenueSheet(revenue, months);
    const costsData = getCostsSheet(employeesInfo, assetsInfo, months);
    const ownedAssetsData = getOwnedAssetsSheet(assetsInfo, months);
    const expensesData = getExpensesSheet(employeesInfo, expenses, months);
    const accountData = getAccountsSheet(accountsInfo, months)

    const data = [overviewData, revenueData, costsData, expensesData, ownedAssetsData, accountData];

    return data;
};

