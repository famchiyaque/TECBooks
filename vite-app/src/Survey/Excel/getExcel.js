function getRevenueSheet(revenue, months) {
    const productsList = revenue.filter(rev => rev.type === "Product");
    const servicesList = revenue.filter(rev => rev.type === "Service")

    const data = [[], [], ['', 'Revenue']]

    const monthsRow = ['', ''];
    months.forEach((month) => {
        monthsRow.push(month);
    });
    data.push(monthsRow);

    if (productsList.length > 0) {
        const productsRow = ['', 'Products']
        months.forEach(() => {
            productsRow.push('Earnings')
        })
        data.push(productsRow)
    }
    productsList.forEach((prod) => {
        data.push(['', prod.name])
    })

    if (servicesList.length > 0) {
        const servicesRow = ['', 'Services']
        months.forEach(() => {
            servicesRow.push('Earnings')
        })
        data.push(servicesRow)
    }
    servicesList.forEach((serv) => {
        data.push(['', serv.name])
    })

    return data
}

function getAssetsSheet(assets, empProduction, months) {
    const data = [[], [], ['', 'Costs']]

    const monthsRow = ['', ''];
    months.forEach((month) => {
        monthsRow.push(month);
    });
    data.push(monthsRow);

    if (empProduction > 0) {
        const empHeaderRow = ['', 'Production Payroll']
        months.forEach(() => empHeaderRow.push('Salary'))
        data.push(empHeaderRow)
        for (let i = 0; i < empProduction; i++) {
            const newEmpRow = ['', `Employee ${i + 1}`]
            data.push(newEmpRow)
        }
    }

    const inventory = assets.filter(asset => asset.name === 'inventory')

    if (inventory.data.length > 0) {
        const invHeaderRow = ['', 'Variable Costs']
        months.forEach(() => invHeaderRow.push('Total Cost'))
        data.push(invHeaderRow)
        for (let i = 0; i < inventory.data.length; i++) {
            const newEmpRow = ['', inventory.data[i].name]
            data.push(newEmpRow)
        }
    }

    return data
}

function getExpensesSheet(empAdmin, assets, expenses, months) {
    const data = [[], [], ['', 'Expenses']]

    const monthsRow = ['', ''];
    months.forEach((month) => {
        monthsRow.push(month);
    });
    data.push(monthsRow);

    if (empAdmin > 0) {
        const empHeaderRow = ['', 'Production Payroll']
        months.forEach(() => empHeaderRow.push('Salary'))
        data.push(empHeaderRow)
        for (let i = 0; i < empAdmin; i++) {
            const newEmpRow = ['', `Employee ${i + 1}`]
            data.push(newEmpRow)
        }
    }

    const ownedAssets = []
    const rentedAssets = []

    assets.forEach(array => {
        array.data.forEach(asset => {
            if (asset.type === "Owned") ownedAssets.push(asset.name)
            else if (asset.type === "Rented" || asset.type === "Leased") rentedAssets.push(asset.name)
        })
    })

    if (rentedAssets.length > 0) {
        const fixedHeaderRow = ['', 'Fixed Costs']
        months.forEach(() => fixedHeaderRow.push('Total Spent'))
        data.push(fixedHeaderRow)
        for (let i = 0; i < rentedAssets.length; i++) {
            const fixedCostRow = ['', rentedAssets[i]]
            data.push(fixedCostRow)
        }
    }

    if (ownedAssets.length > 0) {
        const deprecHeaderRow = ['', 'Depreciation']
        months.forEach(() => deprecHeaderRow.push('Value Lost'))
        data.push(deprecHeaderRow)
        for (let i = 0; i < ownedAssets.length; i++) {
            const deprecRow = ['', ownedAssets[i]]
            data.push(deprecRow)
        }
    }

    if (expenses.length > 0) {
        const expensesHeaderRow = ['', 'Expenses']
        months.forEach(() => expensesHeaderRow.push('Total Spent'))
        data.push(expensesHeaderRow)
        for (let i = 0; i < expenses.length; i++) {
            const expensesRow = ['', expenses[i].name]
            data.push(expensesRow)
        }
    }

    return data
}

export const getExcelData = (revenue, numEmployees, empProduction, empAdmin, assets, expenses, startMonth) => {
    const getMonthNames = (startMonth) => {
        const start = new Date(startMonth);
        const months = [];
        const currentDate = new Date();
        
        while (start <= currentDate) {
            months.push(start.toLocaleString('default', { month: 'long', year: 'numeric' }));
            start.setMonth(start.getMonth() + 1);
        }

        return months;
    };

    const months = getMonthNames(startMonth);

    const revenueData = getRevenueSheet(revenue, months)
    const assetsData = getAssetsSheet(assets, empProduction, months)
    const expensesData = getExpensesSheet(empAdmin, assets, expenses, months)

    const data = [revenueData, assetsData, expensesData];

    return data;
};

