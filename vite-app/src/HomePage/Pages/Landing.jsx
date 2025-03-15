import React from 'react'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'
import EastIcon from '@mui/icons-material/East'
import Header from '../Comps/Header'
// import gif from '../../public/graph-gif.gif'

function Landing() {
    const navigate = useNavigate()

    const goToDashboard = () => {
        navigate('/mxrep-dashboard')
    }

    return (
        <div className='landing'>
            <Header />
            <div className='landing-main'>
                {/* <img src={`${process.env.PUBLIC_URL}/graph-gif.gif`}></img> */}
                <div className='landing-titles'>
                    <Typography variant='h1' sx={{ fontWeight: '600' }}>TECBooks</Typography>
                    <Typography variant='h4' sx={{ fontWeight: '600'}}>Financial Education and Accounting</Typography>
                </div>
                <Typography variant='h6' className='landing-desc'>
                    Generate your business's financial dashboard and documents, play with 
                    our available educational simulators, and more with TECBooks.
                </Typography>
                <div className='landing-btn-group' style={{ flexBasis: '20%' }}>
                    <button className='landing-btn'>Get Your TECBooks</button>
                    <button className='learn-more' onClick={goToDashboard}>
                        Learn More
                        <EastIcon className='landing-learn-btn' sx={{ height: '100%' }} />  
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Landing