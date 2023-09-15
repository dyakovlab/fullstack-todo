import AppRouter from '../Components/AppRouter'
import { useEffect, useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { socket } from '../socket'

function App() {
  const [connected, setConnected] = useState(socket.connected)

  const onConnect = () => {
    setConnected(true)
  }
  const onDisconnect = () => {
    setConnected(false)
  }

  useEffect(() => {
    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
    return () => {}
  }, [])

  useEffect(() => {
    socket.on('connect', () => console.log('connected'))
    socket.connect()
  }, [])

  return connected ? (
    <Router>
      <AppRouter />
    </Router>
  ) : (
    <div>Loading...</div>
  )
}

export default App
