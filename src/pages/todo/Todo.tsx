import { useState, useEffect } from "react";
import { TodoList, TodoItem, Task, todoFromJson } from "../../todo";
import { useParams, useNavigate } from 'react-router-dom';
import { TiArrowBack } from "react-icons/ti";
import { MdOutlineRadioButtonUnchecked, MdOutlineRadioButtonChecked } from "react-icons/md";
import "../insert/Insert.css";

function Todo() {
    const [jsonData, setJsonData] = useState<TodoList | null>(null);
    const [status, setStatus] = useState<boolean>(false);
    const [date, setDate] = useState<string>('');
    const [tasks, setTasks] = useState<Task[]>([{ content: "", status: false }]);
    const navigate = useNavigate();
    const { index } = useParams();

    const handleTaskContentChange = (content: string, index: number) => {
        const newTasks = [...tasks];
        newTasks[index].content = content;
        setTasks(newTasks);
    };

    const handleTaskStatusChange = (index: number) => {
        const newTasks = [...tasks];
        newTasks[index].status = !newTasks[index].status;
        setTasks(newTasks);
        setStatus(!newTasks.some(task => task.status === false));
    };

    const handleAddTask = () => {
        setTasks([...tasks, { content: "", status: false }]);
        setStatus(false);
    };

    const handleDeleteTask = (index: number) => {
        if (tasks.length > 1) {
            setTasks(prevTasks => prevTasks.filter((_, i) => i !== Number(index)));
        } else {
            setTasks([{ content: "", status: false }]);
        }
    };

    const handleSaveTodo = () => {
        const tasksList = tasks.filter((task) => task.content !== "");
        const status = !tasksList.some(task => task.status === false);

        if (tasksList.length == 0 && jsonData){
            jsonData.TODO = jsonData.TODO.filter((_, i) => i != Number(index))
        } else {
            const newTodo = new TodoItem(date == '' ? new Date() : new Date(date + "T23:59:00.000Z"), status, tasksList);
            if (jsonData) {
                jsonData.TODO[Number(index)] = newTodo;
            } else {
                console.error("jsonData é nulo.");
            }

        }
        localStorage.setItem("backup", JSON.stringify(jsonData));
        navigate("/")
    };

    useEffect(() => {
        if (index !== undefined) {
            try {
                const backupData = localStorage.getItem("backup");
                if (backupData) {
                    const todoList = todoFromJson(backupData);
                    setJsonData(todoList);
                    const temp = todoList.TODO[Number(index)];
                    if (temp) {
                        setStatus(temp.status);
                        setTasks(temp.tasks);
                        setDate(temp.date.toISOString().split("T")[0]);
                    }
                }
            } catch (error) {
                console.error("Erro ao ler o JSON:", error);
            }
        }
    }, [index]);

    return (
        <>
            {tasks.length > 0 && (
                <div style={{ width: '100%' }}>
                    <header className="header">
                        <TiArrowBack id="return" onClick={handleSaveTodo} />
                        <input id="data" name="data" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                        <span id="todoStatus">STATUS: {status ? "CONCLUÍDO" : "EM ANDAMENTO"}</span>
                    </header>
                    <div id="task-list">
                        {tasks.map((task, index) => (
                            <div key={index} className="task-container">
                                {task.status ? (
                                    <MdOutlineRadioButtonChecked
                                        className="check-box-task"
                                        onClick={() => handleTaskStatusChange(index)}
                                    />
                                ) : (
                                    <MdOutlineRadioButtonUnchecked
                                        className="check-box-task"
                                        onClick={() => handleTaskStatusChange(index)}
                                    />
                                )}
                                <input
                                    type="text"
                                    className="task"
                                    value={task.content}
                                    onChange={(e) => handleTaskContentChange(e.target.value, index)}
                                />
                                <button className="classic-btn" onClick={() => handleDeleteTask(index)}>delete</button>
                            </div>
                        ))}
                        <button className="classic-btn" onClick={handleAddTask}>+ TASK</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Todo;
