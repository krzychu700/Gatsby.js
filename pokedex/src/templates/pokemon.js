import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from '../components/seo'
import Image from '../components/Image'

import "./pokemon.scss"

export default ({ data }) => {
  const pokemon = data.pokedex.pokemon
  return (
    <Layout>
      <SEO title={pokemon.name} />
        <div className="pokemon_wrapper">
          <div className="pokemon_header">
            <div className="pokemon_header_container">
              <div className="pokemon_name_left"/>
              <div className="pokemon_name">{`#${pokemon.number} `}{pokemon.name}</div>
              <div className="pokemon_name_right"/>
            </div>

          </div>

          <div className="pokemon_container pokemon_container--info">
            <div className="pokemon_picture">
              <img src={pokemon.image} alt={pokemon.name}/>
            </div>

            <div className="pokemon_HP_container">
              <div className="pokemon_health_bar"/>
              <div className="pokemon_HP_status">
                {`HP: ${pokemon.maxHP}`}
              </div>
            </div>

            <div className="pokemon_information">
              <p>Weight:</p>
              <span>{`Minimum: ${pokemon.weight.minimum}`}</span>
              <span>{`Maximum: ${pokemon.weight.maximum}`}</span>
              <p>Height:</p>
              <span>{`Minimum: ${pokemon.height.minimum}`}</span>
              <span>{`Maximum: ${pokemon.height.maximum}`}</span>
              <p>Classification:</p>
              <span>{pokemon.classification}</span>
              <p>Max CP: <span>{pokemon.maxCP}</span></p>
              <p>Type:</p>
              <div className="pokemon_types">
                {pokemon.types.map(type => <Image key={type} alt={type} filename={`${type}.png`} width={"25px"}/>)}
              </div>
               </div>
          </div>

          <div className="pokemon_container pokemon_container--stats">
            <div className="pokemon_stats">
              
            </div>

            <div className="pokemon_graphic_stats">
              <div className="pokemon_weakness">
                {pokemon.weaknesses.map(weak => <Image key={weak} alt={weak} filename={`${weak}.png`} width={"25px"}/>)}
              </div>
              <div className="pokemon_resistant">
                {pokemon.resistant.map(resistant => <Image key={resistant} alt={resistant} filename={`${resistant}.png`} width={"25px"}/>)}
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
