import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import SocketProvider from './context/SocketProvider'
import Lobby from './pages/Lobby';
import Room from './pages/Room';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index path='/' element={<Lobby />} />
      <Route index path='/room/:id' element={<SocketProvider><Room /></SocketProvider>} />
    </>
  )
)

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
