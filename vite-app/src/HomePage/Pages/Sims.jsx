import React from 'react'
import { Typography } from '@mui/material'
import SimCard from '../Comps/SimCard'

function SimsPage() {

  return (
    <div className="page-container page-2">
        <div className='page-topper'>for interactive and educational practice</div>
        <div className='sims-container'>
          <Typography variant='h3' sx={{ fontWeight: '600', padding: '0 0 1.5rem 0' }}>Available Simulators</Typography>
          <div className='sims-grid'>
            <SimCard
              title={"Project Evaluation"}
              img_path={"landing-proj-eval.png"}
              desc={"Create, save, and compare the financial returns of your potential projects and investment opportunities"}
              sim_route={"/project-evaluation-simulator"}
              style={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}
            />
          </div>
        </div>
    </div>
  )
}

export default SimsPage