import {Link} from "react-router-dom"
import {TodoList, todoFromJson, Task, TodoItem} from "../../todo";
import { useState, useEffect, createRef, useRef } from "react";
import "./Insert.css"

function Insert(){
    const [jsonData, setJsonData] = useState<TodoList>();
    const [tasks, setTasks] = useState<Task[]>([{content: "", status: false}]);
    const [date, setDate] = useState<string>('0001-01-01');

    const handleTaskContentChange = (content, index) => {
        const newTasks = [...tasks];
        newTasks[index].content = content;
        setTasks(newTasks);
    };

    const handleTaskStatusChange = (index) => {
        const newTasks = [...tasks];
        newTasks[index].status = !newTasks[index].status;
        setTasks(newTasks);
    };

    const handleAddTask = () => {
        const newTasks = [...tasks];
        newTasks.push(new Task("", false));
        setTasks(newTasks);
    };

    const handleDeleteTask = (index) => {
        if (tasks.length > 1) {
            setTasks((prevTasks) => {
                return prevTasks.filter((_, i) => i !== index);
            });
        } else {
            setTasks([{ content: "", status: false }]);
        }
    };

    const handleSaveTodo = () => {
        const tasksList = tasks.filter((task) => task.content !== "");
        const finishedCount = tasks.filter((task) => task.status !== false).length;
        const status =
            new Date(date).getTime() < new Date().getTime() && finishedCount < tasksList.length
                ? "PENDING"
                : finishedCount < tasksList.length
                  ? "IN_PROGRESS"
                  : "COMPLETED";
        const todo = new TodoItem(date, status, tasksList);
        jsonData.TODO.push(todo);
        localStorage.setItem("backup", JSON.stringify(jsonData));
    };

    useEffect(() => {
        try {
            const todoList = todoFromJson(localStorage.getItem("backup"));
            setJsonData(todoList);
        } catch (error) {
            console.error("Erro ao ler o JSON:", error);
        }
    }, []);

    return (
        <>
            <Link to="/" className="newTodo" onClick={() => handleSaveTodo()}>
                Voltar
            </Link>
            <span id="todoStatus">STATUS: NEW</span>
            <header>
                <input id="data" name="data" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </header>
            <div id="task-list">
                {tasks.map((task, index) => (
                    <div key={index} className="task-container">
                        <input
                            type="checkbox"
                            checked={task.status}
                            onChange={( ) => handleTaskStatusChange(index)}
                        />
                        <input
                            type="text"
                            value={task.content}
                            onChange={(e) => handleTaskContentChange(e.target.value, index)}
                        />
                        <button onClick={() => handleDeleteTask(index)}>delete</button>
                    </div>
                ))}
                <button onClick={() => handleAddTask()}>+ TASK</button>
            </div>
        </>
    );
}

export default Insert;
