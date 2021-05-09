import "./App.scss"
import { AuthProvider } from "./context/AuthContext"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import LoginPage from "./pages/LoginPage/LoginPage"

import StatsPage from "./pages/StatsPage/StatsPage"
import UserPage from "./pages/UserPage/UserPage"
import PageWrapper from "./containers/PageWrapper/PageWrapper"

import MainSection from "./pages/MainSection/MainSection"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import BackgroundAnimation from "./components/BackgroundAnimation/BackgroundAnimation"
function App() {
  return (
    <div className="App">
      <BackgroundAnimation objects={15} />
      <BrowserRouter>
        <AuthProvider>
          <Switch>
            <Route
              exact
              path="/"
              component={() => (
                <PageWrapper content={<MainSection></MainSection>} />
              )}
            />
            <Route
              exact
              path="/stats"
              component={() => (
                <PageWrapper content={<StatsPage></StatsPage>} />
              )}
            />
            <Route path="/login" component={LoginPage} />
            <Route
              path="/sessions"
              component={() => (
                <PageWrapper content={<SessionsPage></SessionsPage>} />
              )}
            />
            {/* <Route exact path="/user" component={UserPage} /> */}
          </Switch>
        </AuthProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
