import { useState, useEffect } from "react";
import "./Home.css";
import SvgComponent from "../../assets/SvgComponent";
import {TodoList, todoFromJson} from "../../todo";
import {Link} from "react-router-dom";
import SideMenu from "../../components/sideMenu/SideMenu";

function Home() {
  const [jsonData, setJsonData] = useState<TodoList>( );

  const handleUploadBackup = (event:any) => {
    const file = event.target.files[0];

    if (file.type === "application/json") {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const todoList = todoFromJson(e.target.result)
          setJsonData(todoList);
        } catch (error) {
          console.error("Erro ao ler o JSON:", error);
        }
      };
      reader.readAsText(file);
    }
  };

  function updateStorages(json: TodoList): void {
    localStorage.setItem("backup", JSON.stringify(json))
  }

useEffect(() => {
    if (jsonData) {
          updateStorages(jsonData);
    }
}, [jsonData]);

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
        <SideMenu />
      <div className="logo">
        <SvgComponent className="dev" />
        <span>NOTE PAD</span>
      </div>
      <Link to="/insert" className="classic-btn">+ TO-DO-LIST</Link>
      <br />
      <input type="file" accept="application/json" onChange={(e) => handleUploadBackup(e)} id="backupInput"/>
      <label htmlFor="backupInput" id="backupLabel">upload de backup</label>
    </>
  );
}

export default Home;
