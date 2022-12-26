import React from "react";

const ToDoItem = ({item, deleteTodo}) => {
    return (
        <tr>
            <td>{item.id}</td>
            <td>{item.is_active}</td>
            <td>{item.todo_text}</td>
            <td><button onClick={()=>deleteTodo(item.id)} type='button'>Delete</button></td>
        </tr>
    )
}

const ToDoList = ({items, deleteTodo}) => {
    return (
        <table>
            <tr>
                <th>ID</th>
                <th>IS_ACTIVE</th>
                <th>WHAT_TODO?</th>
                <th></th>
            </tr>
            {items.map((item) => <ToDoItem item={item} deleteTodo={deleteTodo} />)}
        </table>
    )
}
export default ToDoList