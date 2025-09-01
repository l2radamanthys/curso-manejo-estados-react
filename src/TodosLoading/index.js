import React from "react";
import { EmptyTodoItem } from "../EmptyTodoItem";



function TodosLoading() {
    const items = [ 1, 2, 3, 4, 5];
    return (
        <>
        {items.map((item, index) => (
            <EmptyTodoItem key={index}/>
        ))}
        </>
    )
}

export { TodosLoading };