import { Router } from "react-router-dom"
import "./App.css"
import LoginSignUpForm from "./containers/LoginSignUpForm/LoginSignUpForm"
import { AuthProvider } from "./context/AuthContext"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import LoginPage from "./pages/LoginPage/LoginPage"
import Dashboard from "./pages/Dashboard/Dashboard"
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Switch>
            <Route exact path="/" component={Dashboard} />

            <Route path="/login" component={LoginPage} />
          </Switch>
        </AuthProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
