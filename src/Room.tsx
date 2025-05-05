import { gql } from "@apollo/client";

const GET_CHANNELS_QUERY = gql`
    query GetChannels {
        channels()
    }
`;

export const Room = () => {
  return <div>This is Room Page</div>;
};
