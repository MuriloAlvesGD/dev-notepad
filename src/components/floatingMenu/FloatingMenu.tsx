import "./floatingMenu.css";
import { ImCross } from "react-icons/im";
import { MdOutlineDownloading } from "react-icons/md";

function FloatingMenu() {

    const handleDownload = () => {
        const blob = new Blob([localStorage.getItem("backup")], {type: "application/json"})
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a")
        a.href = url;
        a.download = "backup.json";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    return (
        <div id="controller">
            <div id="top-bar">
                <input type="checkbox" id="menuBtn"></input>
                <label id="labelMenu" htmlFor="menuBtn">
                    <ImCross />
                </label>
                <nav id="navBtn">
                    <MdOutlineDownloading className="btn" onClick={() => handleDownload()}/>
                </nav>
            </div>
        </div>
    );
}

export default FloatingMenu;
