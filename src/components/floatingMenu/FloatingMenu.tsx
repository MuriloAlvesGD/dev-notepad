import "./floatingMenu.css";
import { ImCross } from "react-icons/im";
import { FaGear } from "react-icons/fa6";
import { MdOutlineDownloading } from "react-icons/md";
import { useState} from "react";

function FloatingMenu() {
    const [open, setOpen] = useState(false)

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
                <input type="checkbox" id="menuBtn" onChange={() => setOpen(!open)}></input>
                <label id="labelMenu" htmlFor="menuBtn">
                    {open ? <ImCross /> : <FaGear/>}
                </label>
                <nav id="navBtn">
                    <MdOutlineDownloading className="btn" onClick={() => handleDownload()}/>
                </nav>
            </div>
        </div>
    );
}

export default FloatingMenu;
