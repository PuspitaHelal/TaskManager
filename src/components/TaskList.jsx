export default function TaskList({ tasks, deleteTask, toggleTask }) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <span
            onClick={() => toggleTask(task.id)}
            style={{
              textDecoration: task.completed ? "line-through" : "none",
              cursor: "pointer",
            }}
          >
            {task.title}
          </span>

          <button onClick={() => deleteTask(task.id)}>X</button>
        </li>
      ))}
    </ul>
  );
}