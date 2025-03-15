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
import SearchUser from './routes/search'
import Setting from './routes/settings'
import {ToastContainer, toast} from 'react-toastify'
function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
      <ToastContainer/>
        <Routes>
            <Route element={<Layout><ProtectedRoute><UserProfile/></ProtectedRoute></Layout>} path='/:username'/>
            <Route element={<Layout><ProtectedRoute><CreatePost/></ProtectedRoute></Layout>} path='/create/post'/>
            <Route element={<Layout><ProtectedRoute><Home/></ProtectedRoute></Layout>} path='/'/>
            <Route element={<Layout><ProtectedRoute><SearchUser/></ProtectedRoute></Layout>} path='/search'/>
            <Route element={<Layout><ProtectedRoute><Setting/></ProtectedRoute></Layout>} path='/setting'/>
            <Route element={<Layout><Login></Login></Layout>} path='/login'/>
            <Route element={<Layout><Register/></Layout>} path='/register'/>
        </Routes>
      </AuthProvider>
    </ChakraProvider>
  )
}

export default App
