import { gql, useSubscription } from "@apollo/client";
import { OnMessageReceivedSubscription } from "@/generated/graphql.ts";

const MESSAGE_RECEIVED_SUBSCRIPTION = gql`
  subscription onMessageReceived {
    messageReceived {
      count
    }
  }
`;

export const Workspace = () => {
  const { data } = useSubscription<OnMessageReceivedSubscription>(
    MESSAGE_RECEIVED_SUBSCRIPTION,
    {
      onData: () => console.log("hello"),
    },
  );

  console.log(data);

  return (
    <div>
      <div>MessageCount: {data?.messageReceived.count}</div>
    </div>
  );
};
