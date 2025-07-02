import { useState, useEffect } from "react";
import "./Home.css";
import SvgComponent from "../../assets/SvgComponent";
import { TodoList, todoFromJson } from "../../todo";
import { Link } from "react-router-dom";
import SideMenu from "../../components/sideMenu/SideMenu";

function Home() {
    const [jsonData, setJsonData] = useState<TodoList | null>(null);

    const handleUploadBackup = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if ((files && files.length > 0) && files[0].type === "application/json") {
            const file: any = files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const target = e.target;
                    if (target) {
                        const todoList = todoFromJson(target.result);
                        updateStorages(todoList);
                    }
                } catch (error) {
                    console.error("Erro ao ler o JSON:", error);
                }
            };
            reader.readAsText(file);
        } else {
            console.error("Nenhum arquivo selecionado.");
        }
    };

    const refreshPage = () => {
    window.location.reload();
  };

  const updateStorages = (json: TodoList) => {
    localStorage.setItem("backup", JSON.stringify(json));
    refreshPage()
  }

    useEffect(() => {
        try {
            const backupData = localStorage.getItem("backup");
            if (backupData) {
                const todoList = todoFromJson(backupData);
                setJsonData(todoList);
            }
        } catch (error) {
            console.error("Erro ao ler o JSON:", error);
        }
    }, []);

    return (
        <>
            {jsonData && <SideMenu />}
            <div className="logo">

                <SvgComponent/>
                <span>NOTE PAD</span>
            </div>
            <Link to="/insert" className="classic-btn">+ TO-DO-LIST</Link>
            <br />
            <input type="file" accept="application/json" onChange={handleUploadBackup} id="backupInput" />
            <label htmlFor="backupInput" id="backupLabel">upload de backup<br /> [apenas JSON]</label>
        </>
    );
}

export default Home;
