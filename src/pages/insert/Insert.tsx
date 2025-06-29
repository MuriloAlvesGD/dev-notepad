import {Link} from "react-router-dom"
import {TodoList, todoFromJson} from "../../todo";
import { useState, useEffect } from "react";
import "./Insert.css"

function Insert(){
    const [jsonData, setJsonData] = useState<TodoList>( );

    useEffect(() => {
    try {
          const todoList = todoFromJson(localStorage.getItem("backup"))
          setJsonData(todoList);
        } catch (error) {
          console.error("Erro ao ler o JSON:", error);
        }
}, []);

    return (
    <>
        <Link to="/" className="newTodo">Voltar</Link>
            <span id="todoStatus">STATUS: NEW</span>
        <header>
            <input id="data" name="data" type="date"/>
        </header>

    </>
    )
}

export default Insert;
