import { useState } from 'react'
import './App.css'
import { Provider } from 'react-redux';
import { store } from './app/store';
import Table from './components/Table'
import NavBar from './components/NavBar'

function App() {

  return (
    
  <Provider store={store}>
        <NavBar />
        <Table />
    </Provider>
  )
}

export default App
