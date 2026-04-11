import AppRoutes from './routes'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AppRoutes />
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  )
}

export default App;

