import { useState } from "react";

export function FeedbackForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setTimeout(() => {
      if (name.trim() && message.trim()) {
        setSubmitted(true);
      }
    }, 1500);
  };

  return (
    <div>
      <h1>Обратная связь</h1>
      <label htmlFor="name">Имя:</label>
      <input
        id="name"
        placeholder="Ваше имя"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="message">Сообщение:</label>
      <textarea
        id="message"
        placeholder="Ваше сообщение"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSubmit}>Отправить</button>
      {submitted && <p>Спасибо, {name}! Ваше сообщение отправлено.</p>}
    </div>
  );
}