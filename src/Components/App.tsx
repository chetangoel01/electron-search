import { handleOpenFile } from '../Data/IPC/IPCMessages'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from './Landing'
import Login from './Login'
import './App.css'

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/search' element={<Landing />} />
          <Route path='/' element={<Login />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
