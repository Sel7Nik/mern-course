import 'materialize-css'
import { useRoutes } from './routes'
import { BrowserRouter as Router } from 'react-router-dom'

//?
function App() {
  const routes = useRoutes(false)
  return (
    <Router>
      <div className="container">
        <h1> App page</h1>
        {routes}
      </div>
    </Router>
  )
}

export default App
