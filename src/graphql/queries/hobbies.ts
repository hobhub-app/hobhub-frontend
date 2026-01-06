import { gql } from "@apollo/client";

export const HOBBIES = gql`
  query Hobbies {
    hobbies {
      id
      name
    }
  }
`;
