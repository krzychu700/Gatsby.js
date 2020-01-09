import React from "react"
import { useState, useEffect } from "react";
import { graphql, Link } from "gatsby"
import Image from '../components/Image';
import Layout from "../components/layout"
import SEO from "../components/seo"
import "./index.scss"

const IndexPage = ({data}) => {

  const [pokemonsData, setPokemonsData] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const [pokemonTypesData] = useState([
    {
      type: "Bug",
      checked: false
    },
    {
      type: "Dragon",
      checked: false
    },
    {
      type: "Electric",
      checked: false
    },
    {
      type: "Fairy",
      checked: false
    },
    {
      type: "Fighting",
      checked: false
    },
    {
      type: "Fire",
      checked: false
    },
    {
      type: "Flying",
      checked: false
    },
    {
      type: "Ghost",
      checked: false
    },
    {
      type: "Grass",
      checked: false
    },
    {
      type: "Ground",
      checked: false
    },
    {
      type: "Ice",
      checked: false
    },
    {
      type: "Normal",
      checked: false
    },
    {
      type: "Poison",
      checked: false
    },
    {
      type: "Psychic",
      checked: false
    },
    {
      type: "Rock",
      checked: false
    },
    {
      type: "Steel",
      checked: false
    },
    {
      type: "Water",
      checked: false
    },
  ]);
  const [pokemonTypes, setPokemonTypes] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    let tempArray =[];
    data.pokedex.pokemons.forEach(pokemon => {
      tempArray.push({
        name: pokemon.name, 
        types: pokemon.types,
        number: pokemon.number,
        id: pokemon.id,
        image: pokemon.image});
    });
    setPokemonsData(tempArray);
    setPokemonTypes(pokemonTypesData);
    setPokemons(tempArray);
  }, [data.pokedex.pokemons, pokemonTypesData]);

  const filterData = (event) => {
    let pokemonData = [...pokemonsData];
    let pokemonTypesDataCopy = [...pokemonTypesData];
    if(selected === event.target.id) {
      setSelected(null);
      setPokemons(pokemonData);
      setPokemonTypes(pokemonTypesDataCopy.map(p =>
        p.type === event.target.id
          ? { ...p, checked: false }
          : p
      ));
    } else {
      setSelected(event.target.id);
      const result = pokemonData.filter(pokemon =>{
        return pokemon.types.find(type => {
          return type === event.target.id
        });
      });
  
      setPokemons(result);
      setPokemonTypes(pokemonTypesDataCopy.map(p =>
        p.type === event.target.id
          ? { ...p, checked: true }
          : p
      ));
    }

  }

  return (
  <Layout>
    <div className="filter_pokemon_types">
      <span style={{width: "100%"}}>Show only:</span>
      {pokemonTypes.map(pokemonType =>
      <span role = "button"  tabIndex='0' className="filter_pokemon_type" key={pokemonType.type} onKeyDown ={filterData} onClick={filterData} id={pokemonType.type} style={{opacity: `${pokemonType.checked ? 1 : 0.5}`}}>
        <img src={`../../${pokemonType.type}.png`} id={pokemonType.type} className="filter_pokemon_type" key={pokemonType.type} alt={pokemonType.type}/>
      </span>
      )}
    </div>
    <SEO title="Home" />
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap'}}>
        {pokemons.map(pokemon => 
          <div key={pokemon.id} style={{padding: '1rem', width: '30%', height: '250px'}}>
            <Link to={`/pokemon/${pokemon.name}`}>
              <div style={{position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '100%', height: '100%'}}>
                <img style={{maxHeight: '80%', maxWidth: '100%', margin: "0"}} src={pokemon.image} alt={pokemon.name}/>
                <div className="pokemon_data">
                  <p>{`#${pokemon.number} `}{pokemon.name}</p>
                  <div className="pokemon_type">
                    {pokemon.types.map( type => 
                      <Image key={type} alt={type} filename={`${type}.png`} width={"25px"}/>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </div>
          )}

      </div>
  </Layout>
)}

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
