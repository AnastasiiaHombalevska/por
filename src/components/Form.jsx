import React, { useEffect, useState } from "react";
import FormMessage from "./FormMessage";

import "../styles/Form.css";

export default function Form() {
  const [messageState, setMessageState] = useState(null);
  const [userName, setUserName] = useState("");

  function sendMsg(e) {
    const form = e.target;
    e.preventDefault();

    const formData = new FormData(form);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    if (!name || !email || !message) {
      setMessageState(false);
      return;
    } else {
      form.reset();
      setUserName(name);
      setMessageState(true);
    }
  }

  useEffect(() => {
    if (messageState !== null) {
      const timer = setTimeout(() => {
        setMessageState(null);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [messageState]);

  return (
      <form className="contacts--form form" onSubmit={sendMsg}>
        <label>Name:
          <input type="text" name="name" className="form--field form--input"/>
        </label>

        <label>Email:
          <input type="email" name="email" className="form--field form--input"/>
        </label>

        <label>Message:
          <textarea name="message" cols="30" rows="10" className="form--field form--textarea"></textarea>
        </label>

        <button type="submit" className="form--btn">Send message</button>
      {messageState !== null && <FormMessage state={messageState} userName={userName} />}
    </form>
  )
}