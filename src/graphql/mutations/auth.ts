import { gql } from "@apollo/client";

export const REGISTER_MUTATION = gql`
  mutation RegisterUser($input: CreateUserInput!) {
    registerUser(input: $input) {
      token
      user {
        user_id
        email
        firstname
        lastname
      }
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation LoginUser($input: LoginInput!) {
    loginUser(input: $input) {
      token
      user {
        user_id
        email
        firstname
        lastname
      }
    }
  }
`;

export const GOOGLE_SIGN_IN_MUTATION = gql`
  mutation LoginWithGoogle($token: String!) {
    loginWithGoogle(token: $token) {
      token
      user {
        user_id
        email
        firstname
        lastname
      }
    }
  }
`;
