import "./floatingMenu.css";
import { ImCross } from "react-icons/im";
import { FaGear } from "react-icons/fa6";
import { MdOutlineDownloading } from "react-icons/md";
import { useState } from "react";

function FloatingMenu() {
    const [open, setOpen] = useState<boolean>(false);

    const handleDownload = () => {
        const backupData = localStorage.getItem("backup");
        if (!backupData) {
            console.error("No backup data found in localStorage.");
            return;
        }

        const blob = new Blob([backupData], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "backup.json";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div id="controller">
            <div id="top-bar">
                <input type="checkbox" id="menuBtn" onChange={() => setOpen(!open)} />
                <label id="labelMenu" htmlFor="menuBtn" aria-expanded={open}>
                    {open ? <ImCross /> : <FaGear />}
                </label>
                <nav id="navBtn">
                    <div className="btn" onClick={handleDownload} aria-label="Download Backup">
                        <MdOutlineDownloading />
                    </div>
                </nav>
            </div>
        </div>
    );
}

export default FloatingMenu;
