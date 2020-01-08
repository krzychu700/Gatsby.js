import { Character } from './models/Character'
import { Relation } from './models/Relation'


const relations = async relationId => {
  try {
    const relation = await Relation.find({ _id: { $in: relationId } });
    relation.map(person => {
      return {
        ...person._doc,
        _id: person.id
      };
    });
    return relation;
  } catch (err) {
    throw err;
  }
}

export const resolvers = {
  Query: {
    getCharacter: (id) =>
      Character.findOne({ where: id }),

    getAllCharacters: () => {
      return Character.find()
        .then(characters => {
          return characters.map(character => {
            return {
              ...character._doc,
              id: character._doc._id.toString(),
              relations: relations.bind(this, character._doc.relations
            )}
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
      try {
        const characterExist = await Character.findOne({name: name});

        if (characterExist) {
          throw new Error("Character exists already.");
        } else {
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
            
          const result = await character.save()
          return {...result._doc, id: result.id};
        }
      } catch(err) {
          console.log("Character exists already.")
          throw err
      };
    },

    createRelation: async (_, {name}) => {
      const relation = new Relation({
        name,
        relatedTo: "5e11f09913fdc24470f2baa9"
      })

      return relation.save().then(result => {
        Character.relations = { ...result._doc, _id: result._doc._id.toString() };
        return Character.findById("5e11f09913fdc24470f2baa9");
      })
      .then(person => {
        person.relations.push(relation);
        return person.save();
      })
      .then(result => {
        return relation;
      })
    }
  }
}