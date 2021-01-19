import { Router } from "react-router-dom"
import "./App.scss"
import LoginSignUpForm from "./containers/LoginSignUpForm/LoginSignUpForm"
import { AuthProvider } from "./context/AuthContext"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import LoginPage from "./pages/LoginPage/LoginPage"
import Dashboard from "./pages/Dashboard/Dashboard"
import { CategoryProvider } from "./context/CategoryContext"
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <CategoryProvider>
            <Switch>
              <Route exact path="/" component={Dashboard} />

              <Route path="/login" component={LoginPage} />
            </Switch>
          </CategoryProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
