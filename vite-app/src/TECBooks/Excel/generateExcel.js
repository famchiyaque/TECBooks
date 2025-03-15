import * as XLSX from "xlsx";

function generateExcelFile(userData) {
    // Create a new workbook
    const wb = XLSX.utils.book_new();

    // Define the common structure
    const summaryData = [
        ["Business Name", userData.businessName],
        ["Business Type", userData.businessType],
        ["Revenue Streams", userData.revenueStreams.join(", ")],
        ["Has Employees", userData.hasEmployees ? "Yes" : "No"],
        ["Total Employees", userData.numEmployees || 0]
    ];
    const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(wb, summarySheet, "Business Summary");

    // Conditionally add a Payroll Sheet
    if (userData.hasEmployees) {
        const payrollData = [["Employee Type", "Number", "Annual Cost"]];
        payrollData.push(["Production", userData.productionEmployees || 0, ""]);
        payrollData.push(["Administrative", userData.adminEmployees || 0, ""]);
        const payrollSheet = XLSX.utils.aoa_to_sheet(payrollData);
        XLSX.utils.book_append_sheet(wb, payrollSheet, "Payroll");
    }

    // Conditionally add an Inventory Sheet
    if (userData.hasInventory) {
        const inventoryData = [["Item Name", "Quantity", "Unit Cost"]];
        userData.inventoryItems.forEach(item => {
            inventoryData.push([item.name, item.quantity, item.unitCost]);
        });
        const inventorySheet = XLSX.utils.aoa_to_sheet(inventoryData);
        XLSX.utils.book_append_sheet(wb, inventorySheet, "Inventory");
    }

    // Create the file and trigger download
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([wbout], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = "Personalized_Financial_Template.xlsx";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
