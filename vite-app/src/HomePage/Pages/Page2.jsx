import { Typography } from '@mui/material'
import React from 'react'
import EastIcon from '@mui/icons-material/East'

function Page2() {

  return (
    <div className='page-container page-1' id="mxrep-page">
      <div className='more-a'>for students from MxREP production line simulator</div>
      <div className='mxrep-container'>
          <div className='mxrep-top'>
            <div className='mxrep-top-left'>
              <Typography variant='h4' sx={{ fontWeight: '600' }}>Generate</Typography>
              <Typography variant='body1'sx={{ fontWeight: '600' }}>
                your production line's TECBooks and production line dashboards
                from MxRep directly from the simulation.
              </Typography>
              <button className='learn-more'>
                <a className='a-btn' href='http://10.97.85.98' target='_blank'>Go to MxRep Simulator</a>
                <EastIcon className='landing-learn-btn' sx={{ fill: 'black' }} />
              </button>
            </div>
            <div className='mxrep-arrow'>
              <svg width="140%" height="100%" viewBox="0 0 280 115">
                <path d="M10,100 A90,90 0 0,1 190,100"
                      stroke="black"
                      strokeWidth="4"
                      strokeDasharray="10,10"
                      fill="transparent" />
                
                <polygon points="200,100 180,100 190,115"
                        fill="black" />
              </svg>
            </div>
            <div className='mxrep-top-right'>
              <Typography variant='h4' sx={{ fontWeight: '600' }}>Optimize</Typography>
              <Typography variant='body1'sx={{ fontWeight: '600' }}>
                your business with TECBook's effecieny metrics, bottleneck chart, 
                statistical forecasts, and more.
              </Typography>
            </div>
          </div>
          <div className='mxrep-bottom'>
            <img src={'/imgs/mxrep_img.png'} />
            <img src={'/imgs/prod_line_img.png'} />
          </div>
            
      </div>
    </div>
  )
}

export default Page2