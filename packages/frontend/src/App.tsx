import * as React from "react";
import './App.css';
import { useEffect } from "react";
import Prat from './Prat'
import Avail from './Avai'

const App = () => {
  useEffect(() => {
    fetch('http://localhost:3333/getPractitioner');
  }, [])

    return (
      <>
        <Prat />
        <Avail />
      </>
    )
}
export default App;