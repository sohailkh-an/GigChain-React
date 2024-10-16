import { ChatProvider } from "../../contexts/ChatContext";
import NewGigDetails from "./newGigDetails";

function NewGigDetailsChatProvider() {
  return (
    <ChatProvider>
      <NewGigDetails />
    </ChatProvider>
  );
}

export default NewGigDetailsChatProvider;
