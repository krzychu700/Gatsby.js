import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from '../components/seo'

export default ({ data }) => {
  const pokemon = data.pokedex.pokemon
  return (
    <Layout>
      <SEO title={pokemon.name} />
      <article className="mw5 center bg-white br3 pa3 pa4-ns mv3 ba b--black-10">
        <div className="tc">
          <img src={pokemon.image} className="br-100 h3 w3 dib" title={pokemon.name} />
          <h1 className="f4">{pokemon.name}</h1>
          <hr className="mw3 bb bw1 b--black-10" />
        </div>

        <dl className="f6 lh-title mv2">
          <dt className="dib b">HP:</dt>
          <dd className="dib ml0 gray">{pokemon.maxHP}</dd>
        </dl>
        <dl className="f6 lh-title mv2">
          <dt className="dib b">Types:</dt>
          <dd className="dib ml0 gray"> {pokemon.types.map(item => <i>{item}&nbsp;</i>)}</dd>
        </dl>
        <dl className="f6 lh-title mv2">
          <dt className="dib b">Weakness:</dt>
          <dd className="dib ml0 gray"> {pokemon.weaknesses.map(item => <i>{item} &nbsp;</i>)}</dd>
        </dl>
        <dl className="f6 lh-title mv2">
          <dt className="dib b">Resistant:</dt>
          <dd className="dib ml0 gray"> {pokemon.resistant.map(item => <i>{item} &nbsp;</i>)}</dd>
        </dl>
      </article>
    </Layout>
  )
}

export const query = graphql`
  query($name: String!) {
    pokedex {
      pokemon(name: $name) {
        name, id, image, types, maxHP, weaknesses, resistant
      }
    }
  }
`
