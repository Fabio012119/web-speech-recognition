import "./navigation.css";
import logo from "../../logo.svg";
import Links from "./NavigationLinks";
import { useState, useEffect } from "react";
import * as sdk from "microsoft-cognitiveservices-speech-sdk";

const Navigation = () => {
  const [isNavShown, setIsNavShow] = useState(false);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => {
        const speechConfig = sdk.SpeechConfig.fromSubscription(
          "YOUR_SUBSCRIPTION_KEY",
          "YOUR_SERVICE_REGION"
        );
        const recognizer = new sdk.SpeechRecognizer(speechConfig);

        recognizer.recognized = (s, e) => {
          const command = e.result.text.toLowerCase();
          console.log(`RECOGNIZED: ${command}`);
          if (command === "open menu.") {
            setIsNavShow(true);
          } else if (command === "close menu.") {
            setIsNavShow(false);
          }
        };

        recognizer.startContinuousRecognitionAsync();
      })
      .catch((error) => {
        console.error("Error requesting microphone access:", error);
      });
  }, []);

  return (
    <>
      <div className="nav-menu nav-menu-container">
        {isNavShown && (
          <nav className="nav-menu">
            <a href="/">
              <img className="logo_image" src={logo} alt="menu logo" />
            </a>
            <Links />
          </nav>
        )}
      </div>
      {!isNavShown && (
        <h3 className="instructions_header">
          Allow the browser to get access to your microphone (don't worry I
          don't do anything suspicious) and then say "Open menu"
        </h3>
      )}
      {isNavShown && (
        <h3 className="instructions_header">Now say "Close menu"</h3>
      )}
    </>
  );
};

export default Navigation;
