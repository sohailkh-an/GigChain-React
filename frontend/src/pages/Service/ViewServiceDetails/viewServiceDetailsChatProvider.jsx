import { ChatProvider } from "../../../contexts/ChatContext";
import ViewServiceDetails from "./viewServiceDetails";

function ViewServiceDetailsChatProvider() {
  return (
    <ChatProvider>
      <ViewServiceDetails />
    </ChatProvider>
  );
}

export default ViewServiceDetailsChatProvider;
