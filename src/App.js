import { Router } from "react-router-dom"
import "./App.scss"
import LoginSignUpForm from "./containers/LoginSignUpForm/LoginSignUpForm"
import { AuthProvider } from "./context/AuthContext"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import LoginPage from "./pages/LoginPage/LoginPage"
import Dashboard from "./pages/Dashboard/Dashboard"
import { SessionProvider } from "./context/SessionContext"
import { UserProvider } from "./context/UserContext"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <UserProvider>
            <SessionProvider>
              <Switch>
                <Route exact path="/" component={Dashboard} />

                <Route path="/login" component={LoginPage} />
              </Switch>
            </SessionProvider>
          </UserProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
