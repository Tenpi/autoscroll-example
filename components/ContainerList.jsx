import React, {useEffect, useState} from "react"
import Reorder from "react-reorder"
import "../styles/containerlist.css"
import Container from "./Container"

const ContainerList = () => {
    const [containers, setContainers] = useState([])

    useEffect(() => {
        for (let i = 1; i <= 100; i++) {
            setContainers((prev) => {
                let newState = [...prev]
                newState = [...newState, {id: i, jsx: <Container key={i} id={i}/>}]
                return newState
            })
        }
    }, [])

    const reorder = (event, from, to) => {
        setContainers((prev) => {
            const newState = [...prev]
            newState.splice(to, 0, newState.splice(from, 1)[0])
            return newState
        })
    }

    return (
        <Reorder reorderId="file-containers" autoScroll={false} component="ul" holdTime={50} onReorder={reorder}>{
            containers.map((c) => (
                <li key={c.id}>
                    {c.jsx}
                </li>
            ))
        }</Reorder>
    )
}

export default ContainerList