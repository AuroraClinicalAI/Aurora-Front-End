import '@styles/App.css'
import { Router } from '@/Router'
import { ServiceProvider } from '@/context/ServiceContext'

function App() {

  return (
    <ServiceProvider>
      <div className='flex flex-col min-h-screen'>
        <Router />
      </div>
    </ServiceProvider>
  )
}

export default App
