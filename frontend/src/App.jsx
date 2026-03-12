import { BrowserRouter as Router, Routes, Route }  from 'react-router-dom'
import Menu from './components/menu'
import Principal from './pages/principal'
import './App.css'

function App() {
  

  return (
    <>
    <Router>
      <Menu />
      <Routes>
        <Route path='/' element={<Principal />} />
       
      </Routes>
    </Router>
     
    </>
  )
}

export default App
