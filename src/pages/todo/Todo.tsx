import {useState, useEffect} from "react";
import {TodoList, TodoItem, todoFromJson} from "../../todo";
import { useParams, useNavigate, Link} from 'react-router-dom';
import { TiArrowBack } from "react-icons/ti";

function Todo(){
    const [jsonData, setJsonData] = useState<TodoList>();
    const [status, setStatus] = useState<boolean>();
    const [date, setDate] = useState<string>('');
    const [tasks, setTasks] = useState<Task[]>([{content: "", status: false}]);
    const navigate = useNavigate()
    const { index } = useParams();

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
        const status = tasks.filter((task) => task.status !== false).length === tasks.length;
        const newTodo = new TodoItem(date, status, tasksList);
        jsonData.TODO[index] = newTodo;
        localStorage.setItem("backup", JSON.stringify(jsonData));
        navigate("/")
    };

    useEffect(() => {
        if (index !== undefined) { // Verifica se o todoIndex não é nulo
            try {
                const todoList = todoFromJson(localStorage.getItem("backup"));
                setJsonData(todoList);
                const temp = todoList.TODO[index]
                setStatus(temp.status);
                setTasks(temp.tasks);
                setDate(temp.date.toISOString().split("T")[0]);
            } catch (error) {
                console.error("Erro ao ler o JSON:", error);
            }
        }
    }, [index]);

    return (
        <>
        {tasks ?
         <div>
            <header>
                <TiArrowBack id="return" onClick={() => handleSaveTodo()}/>
                <input id="data" name="data" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            <span id="todoStatus">{status ? "status: Y" : "status: N"}</span>
            </header>
            <div id="task-list">
                {tasks.map((task, index) => (
                    <div key={index} className="task-container">
                        <input
                            type="checkbox"
                            className="check-box-task"
                            checked={task.status}
                            onChange={( ) => handleTaskStatusChange(index)}
                        />
                        <input
                            type="text"
                            className="task"
                            value={task.content}
                            onChange={(e) => handleTaskContentChange(e.target.value, index)}
                        />
                        <button className="classic-btn" onClick={() => handleDeleteTask(index)}>delete</button>
                    </div>
                ))}
                <button className="classic-btn" onClick={() => handleAddTask()}>+ TASK</button>
            </div> </div> : ""}
        </>
    );
}

export default Todo
