import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({data}) => (
  <Layout>
    <SEO title="Home" />
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap'}}>
        {data.pokedex.pokemons.map(pokemon => 
          <div key={pokemon.id} style={{padding: '1rem'}}>
            <a href={`/pokemon/${pokemon.name}`} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
              <img style={{maxHeight: '150px'}} src={pokemon.image} alt={pokemon.name}/>
              <p>{pokemon.name}</p>
            </a>
           </div>
          )}

      </div>
  </Layout>
)

export const query = graphql`
  query {
    pokedex {
      pokemons(first: 200) {
        name, id, image
      }
    }
  }
`

export default IndexPage
