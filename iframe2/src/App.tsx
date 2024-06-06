/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [textMessage, setTextMessage] = useState<string[]>([
    "start listening...",
  ]);

  useEffect(() => {
    window.addEventListener("message", getMessage, false);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getMessage = (event: any) => {
    const messageData = event.data;
    if (messageData.type === "mint") {
      dealwithMint();
    }
    if (messageData.type === "merge") {
      dealwithMerge();
    }
  };
  const dealwithMint = async () => {
    setTextMessage((val) => [...val, "mint success"]);
  };

  const dealwithMerge = async () => {
    setTextMessage((val) => [...val, "merge success"]);
  };

  const sendMessage = (type: "mint" | "merge", message: any) => {
    window.parent.postMessage(
      {
        type: type,
        data: message,
      },
      "*"
    );
  };

  const sendMint = () => {
    setTextMessage((val) => [...val, "start mint..."]);
    sendMessage("mint", "mint");
  };

  const sendMerge = () => {
    setTextMessage((val) => [...val, "start merge..."]);
    sendMessage("merge", "merge");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
      }}
    >
      iframe Website
      <div className="flex flex-col p-4">
        {textMessage.map((item) => {
          return <span key={item}>{item}</span>;
        })}
      </div>
      {/* <button onClick={sendMessage}>Send Origin Message</button> */}
      <button onClick={sendMint}>Send Mint</button>
      <button onClick={sendMerge}>Send Merge</button>
    </div>
  );
}

export default App;
