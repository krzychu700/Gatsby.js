import React from "react"
import { graphql, Link } from "gatsby"
import Image from '../components/Image';
import Layout from "../components/layout"
import SEO from "../components/seo"
import "./index.css"

const IndexPage = ({data}) => (
  <Layout>
    <SEO title="Home" />
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap'}}>
        {data.pokedex.pokemons.map(pokemon => 
          <div key={pokemon.id} style={{padding: '1rem', width: '30%', height: '250px'}}>
            <Link to={`/pokemon/${pokemon.name}`}>
              <div style={{position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '100%', height: '100%'}}>
                <img style={{maxHeight: '80%', maxWidth: '100%', margin: "0"}} src={pokemon.image} alt={pokemon.name}/>
                <div className="pokemon_data">
                  <p>{`#${pokemon.number} `}{pokemon.name}</p>
                  <div className="pokemon_type">
                    {pokemon.types.map( type => 
                      <Image alt={type} filename={`${type}.png`} width={"25px"}/>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </div>
          )}

      </div>
  </Layout>
)

export const query = graphql`
  query {
    pokedex {
      pokemons(first: 200) {
        number, name, id, image, types
      }
    }
  }
`

export default IndexPage
