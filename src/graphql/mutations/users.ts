import { gql } from "@apollo/client";

export const COMPLETE_ONBOARDING = gql`
  mutation CompleteOnboarding($input: CompleteOnboardingInput!) {
    completeOnboarding(input: $input) {
      id
      firstname
      lastname
      dateOfBirth
      age
      location
      profileImageUrl
      profileDescription
      hobbies {
        id
        skillLevel
        hobby {
          id
          name
        }
      }
    }
  }
`;
