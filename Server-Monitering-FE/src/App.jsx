import { useState } from 'react'
import './App.css'
import RamUsageGraph from './components/ramusage'
import CpuSpeedometer from './components/CpuSpeedShow/CpuSpeedometer'
import Alerts from './components/AlertShow/Alerts'
import Footer from './components/footer/Footer'
function App() {


  return (
    <>
      <div className="App">
        <h1 className="heading">Server Monitoring Dashboard</h1>
        <div>
          <div className='graphs-container'>
            <CpuSpeedometer />
            <div>
              <Alerts />
            </div>
            <RamUsageGraph />
          </div>
          <div className='footer'>
            <h2>Server Monitoring System</h2>
            <Footer />
          </div>
        </div>
      </div>
      
    </>
  )
}

export default App
