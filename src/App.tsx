import '@styles/App.css'
import { Router } from '@/Router'
import { Navbar } from "@components/common/Navbar"
import { Footer } from '@components/common/Footer'

function App() {

  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar/>
      <main className='h-full flex-grow bg-white flex flex-col'>
        <Router/>
      </main>
      <Footer/>
    </div>
  )
}

export default App
