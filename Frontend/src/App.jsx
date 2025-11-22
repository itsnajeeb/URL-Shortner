import React from 'react'
import Dashboard from './components/Dashboard'
import { Route, Routes } from 'react-router-dom'
import ViewDetails from './components/ViewDetails'
import CreateShorUrlForm from './components/CreateShorUrlForm'
import Navbar from './components/Navbar'
import Footer from './Footer'
import Redirect from './components/Redirect'

const App = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />

      <div className='flex-1'>
        <Routes >
          <Route path='/' element={<Dashboard />} />
          <Route path='/:id' element={<Redirect />} />
          <Route path='/add' element={<CreateShorUrlForm />} />
          <Route path='/code/:code' element={<ViewDetails />} />
        </Routes>
      </div>

      <Footer />
    </div>
  )
}

export default App