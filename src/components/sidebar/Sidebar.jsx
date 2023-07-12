import { useState } from "react"
import MoonIcon from "../../assets/MoonIcon"
import SunIcon from "../../assets/SunIcon"
import Icon from "./Icon"
import './Sidebar.css'

export default function Sidebar() {
    const [isLightTheme, setIsLightTheme] = useState(true)

    function handleThemeChange() {
        document.body.classList.toggle('dark-mode')
        setIsLightTheme(!isLightTheme)
    }

    return (
        <header>
            <Icon />
            <div className="sidebar-container">
                <div onClick={handleThemeChange} style={{ cursor: 'pointer' }} className='mode-indicator'>
                    {isLightTheme ? <MoonIcon /> : <SunIcon />}
                </div>
                <div className="divider"></div>
                <img src="/image-avatar.jpg" alt="" id='avatar' />
            </div>
        </header>
    )
}