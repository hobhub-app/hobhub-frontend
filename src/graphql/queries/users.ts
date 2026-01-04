import { gql } from "@apollo/client";

export const ME = gql`
  query Me {
    me {
      id
    }
  }
`;

export const ME_PROFILE = gql`
  query MeProfile {
    me {
      id
      firstname
      lastname
      age
      location
      #   hobbies {
      #     id
      #     hobby {
      #       id
      #       name
      #     }
      #   }
    }
  }
`;

export const BROWSE_USERS = gql`
  query BrowseUsers {
    browseUsers {
      id
      firstname
      lastname
      age
      location
      profileImageUrl
      profileDescription
      hobbies {
        id
        hobby {
          id
          name
        }
      }
    }
  }
`;
