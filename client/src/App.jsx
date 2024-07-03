import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import SocketProvider from './context/SocketProvider'
import ZegoExpressEngine from './context/ZegoExpressEngine'
import Lobby from './pages/Lobby';
import Room from './pages/Room';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index path='/' element={<Lobby />} />
      <Route index path='/room/:id' element={
        <ZegoExpressEngine>
          <SocketProvider>
            <Room />
          </SocketProvider>
        </ZegoExpressEngine>
      } />
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
