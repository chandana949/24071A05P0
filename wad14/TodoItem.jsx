import { useEffect, useState } from "react";

function TodoItem({ todo, deleteTodo }) {
  const [timeLeft, setTimeLeft] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = todo.deadline - now;

      if (diff <= 0) {
        setTimeLeft("Expired");
        setStatus("expired");
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff / (1000 * 60)) % 60);

      if (hours < 24) {
        setTimeLeft(`⚠️ Less than 24 hours left (${hours}h ${minutes}m)`);
        setStatus("warning");
      } else {
        const days = Math.floor(hours / 24);
        setTimeLeft(`${days} days ${hours % 24}h left`);
        setStatus("");
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [todo.deadline]);

  return (
    <div className="todo-item">
      <div>
        <h3>{todo.title}</h3>
        <p className={status}>{timeLeft}</p>
      </div>
      <button onClick={() => deleteTodo(todo.id)}>Delete</button>
    </div>
  );
}

export default TodoItem;