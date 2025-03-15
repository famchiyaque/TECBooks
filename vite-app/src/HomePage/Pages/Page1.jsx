import React from 'react'
import { Typography } from '@mui/material'
import EastIcon from '@mui/icons-material/East'
import { useNavigate } from 'react-router-dom'

function Page1() {
    const navigate = useNavigate()

    const goToSurvey = () => {
        navigate("/survey")
    }

    const goToTemplateUpload = () => {
        navigate("/template-upload")
    }

    const getTemplate = () => {
        console.log("downloading template")
    }

  return (
    <div className="page-container page-2" id="tecbooks-page">
        <div className='page-topper'>for independent users and/or businesses</div>
        <div className='template-flex'>
            <div className='template-1'>
                <div>
                    <Typography variant="h4" sx={{ fontWeight: '600' }}>Complete</Typography>
                    <Typography variant='body1' sx={{ fontWeight: '600' }}>
                        our business cuestionare with your business's details
                    </Typography>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img src={'/imgs/surveyor_landing.png'} style={{ boxShadow: 'none', width: '35%' }}  />
                </div>
                <div style={{ width: '100%', textAlign: 'left' }}>
                    <button className='landing-btn' style={{ marginLeft: '3rem' }} onClick={goToSurvey}>
                        Start Cuestionare
                    </button>
                </div>
                <a className='credits-a' href="https://www.freepik.com/icon/survey_2222295#fromView=search&page=1&position=20&uuid=1a015019-e55b-486d-9c01-558f612755a3">Icon by Freepik</a>    
            </div>
            <div className='temp-arrow'>
                <EastIcon sx={{ fontSize: '2rem' }} />
            </div>
            <div className='template-2'>
                <div>
                    <Typography variant='h4' sx={{ fontWeight: '600' }}>Fill Out</Typography>
                    <Typography variant='body1' sx={{ fontWeight: '600' }}>
                        your excel template with your business's financial data
                    </Typography>
                </div>
                <img src={'/imgs/template_fake_img.png'} />
                {/* <EastIcon sx={{ fontSize: '2rem' }} /> */}
            </div>
            <div className='temp-arrow'>
                <EastIcon sx={{ fontSize: '2rem' }} />
            </div> 
            <div className='template-3'>
                <img src={'/imgs/submit_landing.png'} style={{ boxShadow: 'none', width: '35%', margin: '0 auto' }} />
                <div>
                    <Typography variant='h4' sx={{ fontWeight: '600' }}>Upload It</Typography>
                    <Typography variant='body1' sx={{ fontWeight: '600' }}>
                        here to generate everything from income statements, 
                        balance sheets, and forecasts.
                    </Typography>
                </div>
                <div style={{ width: '100%', textAlign: 'right' }}>
                    <button className='landing-btn' style={{ marginRight: '3rem' }} onClick={goToTemplateUpload}>
                        Upload Template
                    </button>
                </div>
                <div style={{ textAlign: 'center', padding: '0 1rem' }}>
                    <Typography variant='subtitle2' sx={{  fontSize: 'small' }}>Already have your template? Skip the quiz and upload it here!</Typography>
                </div>
                <a className='credits-a' href="https://www.freepik.com/icon/submit_2601814#fromView=search&page=1&position=32&uuid=d7849f54-aeb4-4ec8-ab89-0f2641d63a2a">Icon by Freepik</a>
            </div>
        </div>
    </div>
  )
}

export default Page1