import ReactDOM from 'react-dom/client'
import App from './App'
import './styles.css'

// No StrictMode: double-mounting breaks AnimatePresence exit tracking,
// which freezes the phase transitions this prototype is built around.
ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
