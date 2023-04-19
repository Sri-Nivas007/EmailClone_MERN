import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"

const App = () => {
  const [emails, setEmails] = useState([]);
  const [to, setTo] = useState([]);
  const [from, setFrom] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8500/dataemail");
        setEmails(res.data);
      } catch (err) {
        console.log(err);
      }
    };
  
    fetchData();
  }, []);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await axios.post("http://localhost:8500/sendemail", { to, from, subject, body });
      console.log(res.data);
      setEmails([...emails, { to: to.split(','), from, subject, body }]);
      setTo("");
      setFrom("");
      setSubject("");
      setBody("");
      setError("");
    } catch (err) {
      console.log(err);
      setError("Unable to send email");
    }
  };
  

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:8500/emails/${id}`);
      console.log(res.data);
      setEmails(emails.filter((email) => email._id !== id));
    } catch (err) {
      console.log(err);
    }
  };
  
  return (
    <div>
      <h1>Emails</h1>
      <ul>
      {emails.map((email) => (
  <li key={email._id}>
    <p>To: {email.to.join(", ")}</p>
    <p>From: {email.from}</p>
    <p>Subject: {email.subject}</p>
    <p>Body: {email.body}</p>
    <button onClick={() => handleDelete(email._id)}>Delete</button>
  </li>
))}

      </ul>
      <h2>New Email</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          To:
          <input
            type="text"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </label>
        <br />
        <label>
          From:
          <input
            type="text"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
        </label>
        <br />
        <label>
          Subject:
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </label>
        <br />
        <label>
          Body:
          <textarea value={body} onChange={(e) => setBody(e.target.value)} />
        </label>
        <br />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default App;
