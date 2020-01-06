import { Character } from './models/Character'

export const resolvers = {
  Query: {
    getCharacter: (id) =>
      Character.findOne({ where: id }),
    getAllCharacters: () => {
      return Character.find()
        .then(characters => {
          return characters.map(character => {
            return {...character._doc, id: character._doc._id.toString()}
          });
        })
        .catch(err => {
          throw err;
        });
    }
  },

  Mutation: {
    createCharacter: async (_, { characterInput } ) => {
      const {name, death, pseudonym, title, sex, race, profession, relations} = characterInput
      
      const character = new Character({
        name,
        death,
        pseudonym,
        title,
        sex,
        race,
        profession,
        relations
      });
      
      await character.save()
        .then(result => {
          console.log(result);
          console.log("Done");
          return {...result._doc, id: result.id};
        })
        .catch(err => {
          console.log(err);
          throw errl
        });

      return character
    }
  }
}