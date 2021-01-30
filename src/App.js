import "./App.scss"
import { AuthProvider } from "./context/AuthContext"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import LoginPage from "./pages/LoginPage/LoginPage"
import Dashboard from "./pages/Dashboard/Dashboard"

import StatsPage from "./pages/StatsPage/StatsPage"
import UserPage from "./pages/UserPage/UserPage"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/stats" component={StatsPage} />
            <Route path="/login" component={LoginPage} />
            <Route exact path="/user" component={UserPage} />
          </Switch>
        </AuthProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
