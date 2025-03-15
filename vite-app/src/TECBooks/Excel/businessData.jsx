import React, { createContext, useContext, useState } from "react"

const BusinessContext = createContext()

export function BusinessProvider({ children }) {
  const [businessData, setBusinessData] = useState(null)

  return (
    <BusinessContext.Provider value={{ businessData, setBusinessData }}>
      {children}
    </BusinessContext.Provider>
  );
}

export function useBusiness() {
  return useContext(BusinessContext)
}
