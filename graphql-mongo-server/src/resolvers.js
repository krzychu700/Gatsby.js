import { Character } from './models/Character'

export const resolvers = {
  Query: {
    getCharacter: (id) =>
      Character.findOne({ where: id }),
    getAllCharacters: () => Character.find()
  },

  Mutation: {
    createCharacter: async (_, {name, death, pseudonym, title, sex, race, profession, relations}) => {
      const character = new Character({name, death, pseudonym, title, sex, race, profession, relations});
      await character.save();
      return character
    }
  }
}