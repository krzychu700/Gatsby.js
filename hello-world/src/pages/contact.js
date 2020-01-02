import React from "react"
import Header from "../components/Header/header.js"
import Container from "../components/container.js"
import Layout from "../components/layout";

export default () => (
  <Layout>
    <Container>
      <div className="main-layout-container">
        <Header headerText="Contact" />
        <p>Send us a message!</p>
      </div>
    </Container>
  </Layout>

)