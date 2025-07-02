import {useState, useEffect} from "react";
import {TodoList, TodoItem, todoFromJson} from "../../todo";
import { useParams } from 'react-router-dom';

function Todo(){
    const [jsonData, setJsonData] = useState<TodoList>();
    const [todo, setTodo] = useState<TodoItem>();
    const { index } = useParams();

    useEffect(() => {
        console.log("todoIndex:", index); // Verifique se o todoIndex está sendo capturado corretamente

        if (index !== undefined) { // Verifica se o todoIndex não é nulo
            try {
                const todoList = todoFromJson(localStorage.getItem("backup"));
                setJsonData(todoList);
                setTodo(todoList[Number(index)]);
            } catch (error) {
                console.error("Erro ao ler o JSON:", error);
            }
        }
    }, [index]);

    return (
    <p>{todo ? todo.date : "ruim"}</p>
    )
}

export default Todo
