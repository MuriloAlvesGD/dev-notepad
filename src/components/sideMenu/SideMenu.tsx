import "./SideMenu.css";
import { RxCross2 } from "react-icons/rx";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState, useEffect } from "react";
import { TodoList, todoFromJson } from "../../todo";
import { FaFlag, FaRegFlag } from "react-icons/fa6";
import { TbTrashXFilled } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

function SideMenu() {
    const [checked, setChecked] = useState<boolean>(false);
    const [jsonData, setJsonData] = useState<TodoList>();
    const navigate = useNavigate();
    const [reload, setReload] = useState<boolean>(false);

    const handleTodo = (index: number) => {
        navigate(`/todo/${index}`);
    };

    const handleDeleteTodo = (index: number) => {
        if (jsonData) {
            jsonData.TODO = jsonData.TODO.filter((_, i) => i !== index);
            localStorage.setItem("backup", JSON.stringify(jsonData));
            setReload(!reload);
        }
    };

    useEffect(() => {
        try {
            const todoList = todoFromJson(localStorage.getItem("backup"));
            setJsonData(todoList);
        } catch (error) {
            console.error("Erro ao ler o JSON:", error);
        }
    }, [reload]);

    return (
        <>
            <input type="checkbox" id="sideMenu-btn" />
            <label id="label-sideMenu" htmlFor="sideMenu-btn" onClick={() => setChecked(!checked)}>
                {checked ? <RxCross2 /> : <GiHamburgerMenu />}
            </label>
            <div id="side-container">
                {jsonData ? (
                    jsonData.TODO.map((todo, index) => (
                        <div key={index} className="todo-container">
                            <p className="todo" onClick={() => handleTodo(index)}>
                                {todo.date.toLocaleDateString()}
                                {todo.status ? <FaFlag className="todo-flag" /> : <FaRegFlag className="todo-flag" />}
                            </p>
                            <TbTrashXFilled className="delete-todo" onClick={() => handleDeleteTodo(index)} />
                        </div>
                    ))
                ) : ""}
            </div>
        </>
    );
}

export default SideMenu;
