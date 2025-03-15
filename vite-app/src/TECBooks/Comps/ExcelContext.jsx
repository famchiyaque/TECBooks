import React, { createContext, useContext, useState } from "react";

const ExcelContext = createContext();

export function ExcelProvider({ children, initialData = null }) {
  const [excelData, setExcelData] = useState(initialData);

  return (
    <ExcelContext.Provider value={{ excelData, setExcelData }}>
      {children}
    </ExcelContext.Provider>
  );
}

export function useExcel() {
  return useContext(ExcelContext);
}
