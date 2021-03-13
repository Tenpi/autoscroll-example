import "bootstrap/dist/css/bootstrap.min.css"
import React from "react"
import ReactDom from "react-dom"
import TitleBar from "./components/TitleBar"
import ContainerList from "./components/ContainerList"
import "./index.css"

const App = () => {
  return (
    <main className="app">
      <TitleBar/>
      <div className="add-space"></div>
      <ContainerList/>
    </main>
  )
}

ReactDom.render(<App/>, document.getElementById("root"))