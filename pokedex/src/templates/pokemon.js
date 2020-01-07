import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from '../components/seo'
import Image from '../components/Image'

import "./pokemon.css"

export default ({ data }) => {
  const pokemon = data.pokedex.pokemon
  return (
    <Layout>
      <SEO title={pokemon.name} />
        <div className="pokemon_wrapper">
          <div className="pokemon_header">
            <h1 className="f4">{pokemon.name}</h1>
          </div>

          <div className="pokemon_container pokemon_container--info">
            <div className="pokemon_picture">
              <img src={pokemon.image} alt={pokemon.name} className="br-100 h3 w3 dib" title={pokemon.name} />
            </div>

            <div className="pokemon_information">
              {pokemon.maxHP}
              {pokemon.types.map(type => <Image alt={type} filename={`${type}.png`} width={"25px"}/>)}
            </div>
          </div>

          <div className="pokemon_container pokemon_container--stats">
            <div className="pokemon_stats">
              
            </div>

            <div className="pokemon_graphic_stats">
              <div className="pokemon_weakness">
                {pokemon.weaknesses.map(weak => <Image alt={weak} filename={`${weak}.png`} width={"25px"}/>)}
              </div>
              <div className="pokemon_resistant">
                {pokemon.resistant.map(resistant => <Image alt={resistant} filename={`${resistant}.png`} width={"25px"}/>)}
              </div>
            </div>
          </div>

          <div className="pokemon_attacks">
            <div className="pokemon_attacks_fast">

            </div>
            <div className="pokemon_attacks_special">
              
            </div>
          </div>

          <div className="pokemon_evolutions">

          </div>

        </div>
    </Layout>
  )
}

export const query = graphql`
  query($name: String!) {
    pokedex {
      pokemon(name: $name) {
        name,
        id,
        number,
        weight {
          minimum,
          maximum
        },
        height {
          minimum,
          maximum
        },
        classification,
        attacks {
          fast {
            name
            type
            damage
          }
          special {
            name
            type
            damage
          }
        },
        maxCP,
        image,
        types,
        maxHP,
        weaknesses,
        resistant,
        evolutions {
          types,
          number,
          name
        }
      }
    }
  }
`
