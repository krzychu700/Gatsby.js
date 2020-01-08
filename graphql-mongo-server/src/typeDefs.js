import { gql } from "apollo-server-express";

export const typeDefs = gql `
  type Query {
    getCharacter(id: String!): Character
    getAllCharacters: [Character!]!
  }

  type Character {
    id: ID!
    name: String!,
    death: String,
    pseudonym: String,
    title: String,
    sex: String!,
    race: String!,
    profession: String!,
    relations: [Relation]
  }

  input CharacterInput {
    name: String!
    death: String
    pseudonym: String
    title: String
    sex: String!
    race: String!
    profession: String!
    relations: String
  }

  type Relation {
    id: ID!
    name: String!
    # relation: [Character!]
  }

  type Mutation {
    createCharacter(characterInput: CharacterInput): Character!
    createRelation(name: String!): Relation!
  }
`;