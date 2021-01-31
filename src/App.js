import "./App.scss"
import { AuthProvider } from "./context/AuthContext"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import LoginPage from "./pages/LoginPage/LoginPage"

import StatsPage from "./pages/StatsPage/StatsPage"
import UserPage from "./pages/UserPage/UserPage"
import PageWrapper from "./containers/PageWrapper/PageWrapper"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Switch>
            <Route exact path="/" component={PageWrapper} />
            {/* <Route exact path="/stats" component={StatsPage} /> */}
            <Route path="/login" component={LoginPage} />
            {/* <Route exact path="/user" component={UserPage} /> */}
          </Switch>
        </AuthProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
