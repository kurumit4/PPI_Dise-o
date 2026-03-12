import { BrowserRouter as Router, Routes, Route }  from 'react-router-dom'
import Menu from './components/Menu'
import Principal from './pages/Principal'
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
