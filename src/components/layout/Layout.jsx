import React from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'

const layout = ({children}) => {
  return (
    <div>
      <Navbar/>
      <div className="main-content min-h-screen">
        {children}
      </div>
      <Footer/>
    </div>
  )
}

export default layout
