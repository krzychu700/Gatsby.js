import React from "react"
import { Link } from "gatsby"
import Header from "../components/Header/header.js"
import Container from "../components/container.js"

export default () => (
  <Container>
    <div className="main-layout-container">
      <Link to="/">Home</Link>
      <Header headerText="Contact" />
      <p>Send us a message!</p>
    </div>
  </Container>
)