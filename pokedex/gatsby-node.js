const path = require('path')

exports.createPages = ({ graphql, actions}) => {
  const {createPage} = actions

  return graphql(`
    query {
      pokedex {
        pokemons(first: 151) {
          name, number, image
        }
      }
    }
  `).then(result => {
    for(let i = 0; i < result.data.pokedex.pokemons.length; i++) {
      const pokemon = result.data.pokedex.pokemons[i];
      createPage({
        ...pokemon,
        path: `/pokemon/${pokemon.name}`,
        component: path.resolve('./src/templates/pokemon.js'),
        context: {
          ...pokemon.context,
          name: pokemon.name,
          number: pokemon.number,
          pokemonData: result.data.pokedex.pokemons,
          index: i
        }
      })

    }
  })
}