import React, {useState} from "react"
import {remote} from "electron"
import minimizeButton from "../assets/minimizeButton.png"
import minimizeButtonHover from "../assets/minimizeButton-hover.png"
import maximizeButton from "../assets/maximizeButton.png"
import maximizeButtonHover from "../assets/maximizeButton-hover.png"
import closeButton from "../assets/closeButton.png"
import closeButtonHover from "../assets/closeButton-hover.png"
import "../styles/titlebar.css"

const TitleBar = () => {
    let [hoverClose, setHoverClose] = useState(false)
    let [hoverMin, setHoverMin] = useState(false)
    let [hoverMax, setHoverMax] = useState(false)

    const minimize = () => {
        remote.getCurrentWindow().minimize()
    }

    const maximize = () => {
        const window = remote.getCurrentWindow()
        if (window.isMaximized()) {
            window.unmaximize()
        } else {
            window.maximize()
        }
    }
    
    const close = () => {
        remote.getCurrentWindow().close()
    }

    return (
        <section className="title-bar">
                <div className="title-bar-drag-area">
                    <div className="title-container">
                        <p><span className="title">Autoscroll Example</span></p>
                    </div>
                    <div className="title-bar-buttons">
                        <img src={hoverMin ? minimizeButtonHover : minimizeButton} height="20" width="20" className="title-bar-button" onClick={minimize} onMouseEnter={() => setHoverMin(true)} onMouseLeave={() => setHoverMin(false)}/>
                        <img src={hoverMax ? maximizeButtonHover : maximizeButton} height="20" width="20" className="title-bar-button" onClick={maximize} onMouseEnter={() => setHoverMax(true)} onMouseLeave={() => setHoverMax(false)}/>
                        <img src={hoverClose ? closeButtonHover : closeButton} height="20" width="20" className="title-bar-button" onClick={close} onMouseEnter={() => setHoverClose(true)} onMouseLeave={() => setHoverClose(false)}/>
                    </div>
                </div>
        </section>
    )
}

export default TitleBar