import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import AppRouter from './route/router'
import ReduxProvider from "./components/provider/redux-provider"
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ReduxProvider>
      <AppRouter />
    </ReduxProvider>
  </BrowserRouter>,
)
