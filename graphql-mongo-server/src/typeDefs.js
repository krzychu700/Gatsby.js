import { gql } from "apollo-server-express";

export const typeDefs = gql `
  type Query {
    getCharacter(id: String!): Character
    getAllCharacters: [Character!]!
  }

  type Character {
    id: ID!
    name: String!,
    death: String!,
    pseudonym: String!,
    title: String!,
    sex: String!,
    race: String!,
    profession: String!,
    relations: [Relations]
  }

  type Relations {
    id: ID!
    name: String!
  }

  type Mutation {
    createCharacter(name: String!, death: String!, pseudonym: String!, title: String!, sex: String!, race: String!, profession: String!, relations: String!): Character!
  }
`;