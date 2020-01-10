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
  const [sort, setSort] = useState("NameAZ");

  useEffect(() => {
    let tempArray =[];
    data.pokedex.pokemons.forEach(pokemon => {
      tempArray.push({
        name: pokemon.name, 
        types: pokemon.types,
        number: pokemon.number,
        id: pokemon.id,
        image: pokemon.image,
        weight: pokemon.weight,
        height: pokemon.height,
        maxHP: pokemon.maxHP,
        maxCP: pokemon.maxCP
      });
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

  const sortData = (event) => {
    const { value } = event.target;
    setSort(value);
    switch(value) {
      case "NumberASC":
        pokemons.sort(dynamicSort("number"));
        break;
      case "NumberDES":
        pokemons.sort(dynamicSort("number", null, "desc"));
        break;
      case "NameAZ":
        pokemons.sort(dynamicSort("name"));
        break;
      case "NameZA":
        pokemons.sort(dynamicSort("name", null, "desc"));
        break;
      case "MinHeight":
        pokemons.sort(dynamicSort("height", "minimum"));
        break;
      case "MaxHeight":
        pokemons.sort(dynamicSort("height", "maximum", "desc"));
        break;
      case "MinWeight":
        pokemons.sort(dynamicSort("weight", "minimum"));
        break;
      case "MaxWeight":
        pokemons.sort(dynamicSort("weight", "maximum", "desc"));
        break;
      case "MinHP":
        pokemons.sort(dynamicSort("maxHP"));
        break;
      case "MaxHP":
        pokemons.sort(dynamicSort("maxHP", null, "desc"));
        break;
      case "MinCP":
        pokemons.sort(dynamicSort("maxCP"));
        break;
      case "MaxCP":
        pokemons.sort(dynamicSort("maxCP", null, "desc"));
        break;
      default:
        pokemons.sort(dynamicSort("number"));
    }
  }


  const dynamicSort = (prop1, prop2 = null, direction = 'asc') => (e1, e2) => {
    const a = prop2 ? e1[prop1][prop2] : e1[prop1],
        b = prop2 ? e2[prop1][prop2] : e2[prop1],
        sortOrder = direction === "asc" ? 1 : -1
    return (a < b) ? -sortOrder : (a > b) ? sortOrder : 0;
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

      <div className="pokemon_select_container">
        <span style={{width: "100%"}}>Sort:</span>
        <select onChange={sortData} onBlur={null} value={sort}>
          <option value="NumberASC">Number ASC</option>
          <option value="NumberDES">Number DES</option>
          <option value="NameAZ">Name A-Z</option>
          <option value="NameZA">Name Z-A</option>
          <option value="MinHeight">Min height</option>
          <option value="MaxHeight">Max height</option>
          <option value="MinWeight">Min weight</option>
          <option value="MaxWeight">Max weight</option>
          <option value="MinHP">Min HP</option>
          <option value="MaxHP">Max HP</option>
          <option value="MinCP">Min CP</option>
          <option value="MaxCP">Max CP</option>
        </select>
      </div>
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
      pokemons(first: 151) {
        number,
        name,
        id,
        image,
        types,
        weight {
          minimum,
          maximum
        },
        height {
          minimum,
          maximum
        },
        maxHP,
        maxCP
      }
    }
  }
`

export default IndexPage
