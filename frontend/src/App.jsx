import { useState } from 'react'
import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import {ChakraProvider} from '@chakra-ui/react'
import UserProfile from './routes/user_profile'
import Layout from './components/layout'
function App() {

  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout><UserProfile/></Layout>} path='/:username'/>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  )
}

export default App
