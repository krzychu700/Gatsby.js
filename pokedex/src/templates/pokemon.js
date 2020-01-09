import React from "react"
import { useState, useEffect } from "react";
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from '../components/seo'
import Image from '../components/Image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'

import "./pokemon.scss"

export default ({ data, pageContext }) => {
  const pokemon = data.pokedex.pokemon;

  const [pokemonHeight, setPokemonHeight] = useState();
  const [scale, setScale] = useState({});

  useEffect(() => { 
    const minHeight = parseFloat((pokemon.height.minimum).replace("m", ''));
    const maxHeight = parseFloat((pokemon.height.maximum).replace("m", ''));
    const pokemonHeight = ((minHeight + maxHeight) / 2).toFixed(1);
    let scaleRation, ratio, height, menWidth;

    if(pokemonHeight >= 2 ) {
      scaleRation = 30;
      ratio = Math.ceil((pokemonHeight / 0.5));
      height = (145 - (ratio * 5)) / (ratio + 1);
      menWidth = ((3.5 * (height + 5)) / 2.6 );
      setPokemonHeight((pokemonHeight / 0.5) * (height + 5));
    } else {
      scaleRation = 68;
      ratio = 4;
      height = 30;
      menWidth = 48;
      setPokemonHeight(pokemonHeight * scaleRation);
    }
    
    setScale({ratio: ratio, height: height, menWidth: menWidth})
   }, [pokemon.height.minimum, pokemon.height.maximum, pokemon.name]);

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

            <div style={{width: '55%'}}>
              <div className="pokemon_information">
                <p>Weight:</p>
                <span>{`Minimum: ${pokemon.weight.minimum}`}</span>
                <span>{`Maximum: ${pokemon.weight.maximum}`}</span>
                <p>Classification:</p>
                <span>{pokemon.classification}</span>
                <p>Max CP: <span>{pokemon.maxCP}</span></p>
                <p>Type:</p>
                <div className="pokemon_types">
                  {pokemon.types.map(type => <Image key={type} alt={type} filename={`${type}.png`} width={"25px"}/>)}
                </div>

                <div className="pokemon_HP_container">
                  <div className="pokemon_health_bar"/>
                  <div className="pokemon_HP_status">
                    {`HP: ${pokemon.maxHP}`}
                  </div>
                </div>
              </div>

              <div className="pokemon_height_container">
                <div className="pokemon_height_scale">
                  {[...Array(scale.ratio)].map((e, i) => 
                    <div key={i} className="height_line_wrapper" style={{marginBottom: `${scale.height}px`}}>
                      <span style={{fontSize: "12px"}}>{`${((i + 1) * 0.5).toFixed(1)}m`}</span><div className="height_line"/>
                    </div>
                  )}
                </div>

                <Image alt={"men"} filename={`men.png`} width={`${scale.menWidth}px`}/>

                <img src={pokemon.image} alt={pokemon.name} style={{height: `${pokemonHeight}px`}}/>
              </div>
            </div>

          </div>

          <div className="pokemon_container pokemon_container--stats">
            <div className="pokemon_graphic_stats">
              <div className="pokemon_weakness">
                <p>Weaknesses:</p>
                <div>{pokemon.weaknesses.map(weak => <Image key={weak} alt={weak} filename={`${weak}.png`} width={"25px"}/>)}</div>
              </div>
              <div className="pokemon_resistant">
                <p>Resistants:</p>
                <div>{pokemon.resistant.map(resistant => <Image key={resistant} alt={resistant} filename={`${resistant}.png`} width={"25px"}/>)}</div>
              </div>
            </div>
          </div>

          <div className="pokemon_attacks">
            <div className="pokemon_attacks_fast">
              <p>Pokemon fast attacks:</p>
                {pokemon.attacks.fast.map(attack => 
                  <div key={attack.name} className="pokemon_attacks_wrapper">
                    <span>{attack.name}</span>
                    <Image alt={attack.type} filename={`${attack.type}.png`} width={"25px"}/>
                    <span>{`Dmg: ${attack.damage}`}</span>
                  </div>
                )}
            </div>
            <div className="pokemon_attacks_special">
              <p>Pokemon special attacks:</p>
                {pokemon.attacks.special.map(attack => 
                  <div key={attack.name} className="pokemon_attacks_wrapper">
                    <span>{attack.name}</span>
                    <Image alt={attack.type} filename={`${attack.type}.png`} width={"25px"}/>
                    <span>{`Dmg: ${attack.damage}`}</span>
                  </div>
                )}
            </div>
          </div>
          
          {pokemon.evolutions &&
            <div style={{width: "100%", padding: "10px"}}>
              <p className="pokemon_evolutions_title">Pokemon evolutions:</p>
              <div className="pokemon_evolutions">
                {pokemon.evolutions.map((evolution, index) =>
                  <div key={evolution.name} className="pokemon_evolution_wrapper">
                    {index > 0 &&
                      <div className="pokemon_next_evolution">
                        <FontAwesomeIcon icon={faChevronRight}/>
                      </div>
                    }
                    <Link to={`/pokemon/${evolution.name}`}>
                      <div className="pokemon_evolution">
                        <p>{`#${evolution.number}  ${evolution.name}`}</p>
                        <img src={evolution.image} alt={evolution.name}/>
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          }
        </div>

        <Link to={`/pokemon/${pageContext.pokemonData[pageContext.index === 0 ? 150 : pageContext.index - 1].name}`}>
          <div className="previous_pokemon">
            <div className="page_navigation_wrapper">
              <div className="page_navigation_button">
                <FontAwesomeIcon icon={faChevronLeft}/>
              </div>
              <div className="navigation_pokemon_data">
                <img src={pageContext.pokemonData[pageContext.index === 0 ? 150 : pageContext.index - 1].image} alt={pageContext.pokemonData[pageContext.index === 0 ? 150 : pageContext.index - 1].name}/>
                <p>{`#${pageContext.pokemonData[pageContext.index === 0 ? 150 : pageContext.index - 1].number}  ${pageContext.pokemonData[pageContext.index === 0 ? 150 : pageContext.index - 1].name}`}</p>
              </div>
            </div>
          </div>
        </Link>

        <Link to={`/pokemon/${pageContext.pokemonData[pageContext.index === 150 ? 0 : pageContext.index + 1].name}`}>
          <div className="next_pokemon">
            <div className="page_navigation_wrapper">
                <div className="navigation_pokemon_data">
                  <img src={pageContext.pokemonData[pageContext.index === 150 ? 0 : pageContext.index + 1].image} alt={pageContext.pokemonData[pageContext.index === 150 ? 0 : pageContext.index + 1].name}/>
                  <p>{`#${pageContext.pokemonData[pageContext.index === 150 ? 0 : pageContext.index + 1].number}  ${pageContext.pokemonData[pageContext.index === 150 ? 0 : pageContext.index + 1].name}`}</p>
                </div>
                <div className="page_navigation_button">
                  <FontAwesomeIcon icon={faChevronRight}/>
                </div>
              </div>
          </div>
        </Link>

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
          number,
          name,
          image
        }
      }
    }
  }
`
