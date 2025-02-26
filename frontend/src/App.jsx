import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import {ChakraProvider} from '@chakra-ui/react'
import UserProfile from './routes/user_profile'
import Layout from './components/layout'
import Login from './routes/login'
import Register from './routes/register'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './context/useAuth'
import CreatePost from './routes/create_post'
import Home from './routes/Home'
function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Routes>
            <Route element={<Layout><ProtectedRoute><UserProfile/></ProtectedRoute></Layout>} path='/:username'/>
            <Route element={<Layout><ProtectedRoute><CreatePost/></ProtectedRoute></Layout>} path='/create/post'/>
            <Route element={<Layout><ProtectedRoute><Home/></ProtectedRoute></Layout>} path='/'/>
            <Route element={<Layout><Login></Login></Layout>} path='/login'/>
            <Route element={<Layout><Register/></Layout>} path='/register'/>
        </Routes>
      </AuthProvider>
    </ChakraProvider>
  )
}

export default App
