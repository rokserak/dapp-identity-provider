import React from 'react'
import './App.css'
import { Symfoni } from './hardhat/SymfoniContext'
import { IdentityForm } from './components/IdentityForm'
import { IdentityProfile } from './components/IdentityProfile'

function App() {
  const [showContext, setShowContext] = React.useState<'edit-form' | 'profile-form'>('profile-form')

  const goToEdit = () => {
    setShowContext('edit-form')
  }

  return (
    <div className="App">
      <header className="App-header">
        <Symfoni autoInit={true}>
          {showContext === 'edit-form'
            ? <IdentityForm />
            : <IdentityProfile onEditClicked={goToEdit} />
          }
        </Symfoni>
      </header>
    </div>
  )
}

export default App
