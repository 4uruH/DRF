import React from "react";

const ToDoItem = ({item}) => {
    return (
        <tr>
            <td>{item.id}</td>
            <td>{item.todo_text}</td>
        </tr>
    )
}

const ToDoList = ({items}) => {
    return (
        <table>
            <tr>
                <th>ID</th>
                <th>WHAT_TODO?</th>
            </tr>
            {items.map((item) => <ToDoItem item={item} />)}
        </table>
    )
}
export default ToDoList