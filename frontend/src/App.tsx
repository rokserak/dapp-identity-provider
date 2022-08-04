import React from 'react'
import './App.css'
import { Symfoni } from './hardhat/SymfoniContext'
import { IdentityForm } from './components/IdentityForm'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Symfoni autoInit={true}>
          <IdentityForm />
        </Symfoni>
      </header>
    </div>
  )
}

export default App
