const path = require('path')

exports.createPages = ({ graphql, actions}) => {
  const {createPage} = actions

  return graphql(`
    query {
      pokedex {
        pokemons(first: 151) {
          name
        }
      }
    }
  `).then(result => {
      result.data.pokedex.pokemons.forEach(pokemon =>{
        createPage({
          path: `/pokemon/${pokemon.name}`,
          component: path.resolve('./src/templates/pokemon.js'),
          context: {
            name: pokemon.name
          }
        })
      })
  })
}