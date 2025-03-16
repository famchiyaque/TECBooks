import React, { useState, useEffect } from 'react'
import { Typography } from '@mui/material'
import TypeBiz from './Cords/TypeBiz'
import Revenue from './Cords/Revenue'
import Employees from './Cords/Employees'
import Assets from './Cords/Assets'
import Expenses from './Cords/Expenses'
import Report from './Cords/Report'
import '../styles/survey.css'
import GenericHeader from '../Global Components/GenericHeader'
import GenericSubheader from '../Global Components/GenericSubheader'
// import Accordian from './Pages/Accordian'

function Survey() {
  const [currQuestion, setCurrQuestion] = useState(1)
  const [nameBiz, setNameBiz] = useState('')
  const [typeBiz, setTypeBiz] = useState('Incomplete')
  const [revenue, setRevenue] = useState([])
  const [hasEmployees, setHasEmployees] = useState(null)
  const [numEmployees, setNumEmployees] = useState(null)
  const [empProduction, setEmpProduction] = useState(0)
  const [empAdmin, setEmpAdmin] = useState(0)
  // const [typeEmployees, setTypeEmployees] = useState([])
  const [hasAssets, setHasAssets] = useState(null)
  const [assets, setAssets] = useState([
    { "name": "property", "data": [] }, { "name": "machinery", "data": [] }, { "name": "tech", "data": [] },
    { "name": "inventory", "data": [] }
  ])
  const [typeAssets, setTypeAssets] = useState([])
  const [expenses, setExpenses] = useState([])

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page
  }, []);


  return (
    <div className='survey-page'>
      {/* {pages[currPage]} */}
      <GenericHeader pageName={"Business Accounting"} />
      <GenericSubheader simName={"Questionnaire"} />
      <div className='survey-card'>
          <div className='icon-title'>
            <img src={'/imgs/site-icon-hd.png'} className='survey-icon' />
            <Typography variant="h4" sx={{ fontWeight: '600' }}>KYC Questionnaire</Typography>
          </div>
          <div className='card-desc'>
            <Typography variant='h6'>Answer the questions below</Typography>
          </div>
          <div className='accordions'>

            <TypeBiz currQuestion={currQuestion} setCurrQuestion={setCurrQuestion}
              typeBiz={typeBiz} setTypeBiz={setTypeBiz} nameBiz={nameBiz} setNameBiz={setNameBiz}
            />

            <Revenue currQuestion={currQuestion} setCurrQuestion={setCurrQuestion}
              revenue={revenue} setRevenue={setRevenue}
            />

            <Employees currQuestion={currQuestion} setCurrQuestion={setCurrQuestion}
              hasEmployees={hasEmployees} setHasEmployees={setHasEmployees}
              numEmployees={numEmployees} setNumEmployees={setNumEmployees}
              empProduction={empProduction} setEmpProduction={setEmpProduction}
              empAdmin={empAdmin} setEmpAdmin={setEmpAdmin} 
            />

            <Assets currQuestion={currQuestion} setCurrQuestion={setCurrQuestion}
              hasAssets={hasAssets} setHasAssets={setHasAssets}
              assets={assets} setAssets={setAssets} typeAssets={typeAssets} setTypeAssets={setTypeAssets}
            />

            <Expenses currQuestion={currQuestion} setCurrQuestion={setCurrQuestion}
              expenses={expenses} setExpenses={setExpenses}

            />

            <Report currQuestion={currQuestion} setCurrQuestion={setCurrQuestion}
              expenses={expenses} setExpenses={setExpenses} typeAssets={typeAssets}
              assets={assets} setAssets={setAssets} typeBiz={typeBiz} revenue={revenue}
              hasEmployees={hasEmployees} numEmployees={numEmployees} empProduction={empProduction}
              empAdmin={empAdmin} hasAssets={hasAssets} nameBiz={nameBiz}
            />

            {/* <FinalReport /> */}
          </div>
      </div>
    </div>
  )
}

export default Survey