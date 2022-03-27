import React from 'react'
import logo from './logo.svg'
import './App.css'
import { Symfoni } from './hardhat/SymfoniContext'
import { Greeter } from './components/Greeter'
import { Storage } from './components/Storage'
import { IdentityForm } from './components/IdentityForm'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Symfoni autoInit={true}>
          <img src={logo} className="App-logo" alt="logo" />

          {/*<Greeter />*/}
          {/*<Storage />*/}
          <IdentityForm />
        </Symfoni>
      </header>
    </div>
  )
}

export default App
