// import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import Board from "./Board";

function App() {
  const [page, setPage] = useState("signup");
    

  return (
    <>
      {page === "signup" && (
        <Signup nextPage={() => setPage("login")} />
      )}

      {page === "login" && (
        <Login nextPage={() => setPage("board")} />
      )}

      {page === "board" && <Board />}
    </>
  );
}

export default App;