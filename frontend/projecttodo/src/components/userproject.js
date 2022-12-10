import React from 'react'
import { useParams } from 'react-router-dom'

const ProjectItem = ({item}) => {
    return (
        <tr>
            <td>{item.id}</td>
            <td>{item.user_name}</td>
        </tr>
    )
}
const UserProjectList = ({items}) => {

    let { id } = useParams();
    let filtered_items = items.filter((item) => item.users.id === id)
    return (
        <table>
        <tr>
            <th>ID</th>
            <th>PROJECT_NAME</th>
            <th>CREATER_NAME</th>
        </tr>
            {filtered_items.map((item) => <ProjectItem item={item} />)}
    </table>
    )
}
export default UserProjectList
