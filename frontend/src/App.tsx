import React from 'react'
import logo from './logo.svg'
import './App.css'
import { Symfoni } from './hardhat/SymfoniContext'
import { IdentityForm } from './components/IdentityForm'
import { IdentityProfile } from "./components/IdentityProfile";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Symfoni autoInit={true}>
          <img src={logo} className="App-logo" alt="logo" />

          {/*<IdentityForm />*/}
          {/**/}
          {/*<h1>Profile start</h1>*/}

          <IdentityProfile />
        </Symfoni>
      </header>
    </div>
  )
}

export default App
