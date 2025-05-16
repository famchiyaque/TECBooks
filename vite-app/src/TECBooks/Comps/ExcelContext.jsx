import React, { createContext, useContext, useEffect, useState } from 'react'
import { processExcelData } from '../Excel/processExcel'

const ExcelContext = createContext()

export const useExcel = () => useContext(ExcelContext)

export function ExcelProvider({ children, initialData }) {
  // const [excelData, setExcelData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [bizInfo, setBizInfo] = useState(null)
  const [overviewData, setOverviewData] = useState(null)
  const [revenueData, setRevenueData] = useState(null)
  const [costsData, setCostsData] = useState(null)
  const [expensesData, setExpensesData] = useState(null)
  // const [statementData, setStatementsData] = useState(null)

  useEffect(() => {
    if (!initialData) {
      setLoading(false)
      return
    }

    // Simulate async processing
    const processData = () => {
      setLoading(true)
      try {
        const processed = processExcelData(initialData)
        setBizInfo(processed[0])
        setOverviewData(processed[1])
        // console.log(overviewData)
        setRevenueData(processed[2])
        console.log(revenueData)
        setCostsData(processed[3])
        setExpensesData(processed[4])
        // setStatementsData(processed[1])
      } catch (err) {
        console.error("Error processing Excel data:", err)
      } finally {
        setLoading(false)
      }
    }

    processData()
  }, [initialData])

  return (
    <ExcelContext.Provider value={{ loading, bizInfo, overviewData, revenueData, costsData, expensesData }}>
      {children}
    </ExcelContext.Provider>
  )
}
