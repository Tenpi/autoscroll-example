import React from "react"
import "../styles/container.css"

const Container = (props) => {
    return (
        <section className="wrap-container">
            <div className="container">
                <div className="text">
                    <p>{props.id}</p>
                </div>
            </div>
        </section>
    )
}

export default Container