import "./SideMenu.css"
import { RxCross2 } from "react-icons/rx";
import { GiHamburgerMenu } from "react-icons/gi";
import {useState, useEffect} from "react";
import {TodoList, todoFromJson} from "../../todo";
import { FaFlag } from "react-icons/fa6";
import { FaRegFlag } from "react-icons/fa6";
import {useNavigate} from "react-router-dom";

function SideMenu(){
    const [checked, setChecked] = useState<boolean>(false);
    const [jsonData, setJsonData] = useState<TodoList>();
    const navigate = useNavigate();

    const handleTodo = (index) => {
        navigate(`/todo/${index}`);
    }

    useEffect(() => {
        try {
            const todoList = todoFromJson(localStorage.getItem("backup"));
            setJsonData(todoList);
        } catch (error) {
            console.error("Erro ao ler o JSON:", error);
        }
    }, []);

    return(
        <>
        <input type="checkbox" id="sideMenu-btn"></input>
        <label id="label-sideMenu" htmlFor="sideMenu-btn" onClick={() => setChecked(!checked)}>
            {checked ? <RxCross2 /> : <GiHamburgerMenu />}
                </label>
            <div id="side-container">
                    {jsonData ? jsonData.TODO.map((todo, index) => (
                    <p key={index} className="todo" onClick={() => handleTodo(index)}>{`${todo.date.toLocaleDateString()}`}{todo.status ? <FaFlag className={`todo-flag`}/> : <FaRegFlag className={`todo-flag`}/>}</p>
                    )) : ""}
            </div>
        </>
    )
}

export default SideMenu;
