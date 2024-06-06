/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import "./App.css";

const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms * 1000));

function App() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const [textMessage, setTextMessage] = useState<string[]>([]);

  useEffect(() => {
    window.addEventListener("message", getMessage, false);
  }, []);

  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.onload = () => {
        console.log("iframe onload");
        setTextMessage(["start listening..."]);
      };
    }
  }, [iframeRef]);

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
    setTextMessage((val) => [...val, "get mint message"]);
    await sleep(2);
    setTextMessage((val) => [...val, "mint success"]);
    await sleep(2);
    setTextMessage((val) => [...val, "start notify iframe"]);
    sendMessage("mint", "mint success!");
    setTextMessage((val) => [...val, "notify iframe mint success"]);
  };

  const dealwithMerge = async () => {
    setTextMessage((val) => [...val, "get merge message"]);
    await sleep(2);
    setTextMessage((val) => [...val, "merge success"]);
    await sleep(2);
    setTextMessage((val) => [...val, "start notify iframe"]);
    sendMessage("merge", "merge success!");
    setTextMessage((val) => [...val, "notify iframe merge success"]);
  };

  const sendMessage = (type: "mint" | "merge", message: any) => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current?.contentWindow.postMessage(
        {
          type: type,
          data: message,
        },
        "*"
      );
    }
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
      Origin Website
      <div className="flex flex-col p-4">
        {textMessage.map((item) => {
          return <span key={item}>{item}</span>;
        })}
      </div>
      {/* <button onClick={sendMessage}>Send Iframe Message</button> */}
      <iframe
        ref={iframeRef}
        style={{ width: "80vw", height: "80vh", border: "1px solid black" }}
        src="http://localhost:5173"
      />
    </div>
  );
}

export default App;
