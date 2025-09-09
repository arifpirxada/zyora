import './App.css'
import Header from './components/Header'
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
    <Header />
    <main className='mb-16'>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </main>
    </>
  )
}

export default App
