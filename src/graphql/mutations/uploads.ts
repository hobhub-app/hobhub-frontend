import { gql } from "@apollo/client";

export const GET_UPLOAD_SIGNATURE = gql`
  mutation GetUploadSignature {
    getUploadSignature {
      timestamp
      signature
      cloudName
      apiKey
    }
  }
`;
