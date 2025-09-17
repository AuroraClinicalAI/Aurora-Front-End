import '@styles/App.css'
import { Router } from '@/Router'
import { Navbar } from "@components/common/Navbar"
import { Footer } from '@components/common/Footer'

function App() {

  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar/>
      <main className='flex-grow bg-white'>
        <Router/>
      </main>
      <Footer/>
    </div>
  )
}

export default App
