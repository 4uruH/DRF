import React from "react";
const ProjectItem = ({item}) => {
return (
    <tr>
        <td>{item.project_name}</td>
        <td>{item.users.user_name}</td>
    </tr>
)
}
const ProjectList = ({items}) => {
return (
    <table>
        <tr>
            <th>PROJECT_NAME</th>
            <th>CREATED_USER</th>
        </tr>
        {items.map((item) => <ProjectItem item={item} />)}
    </table>
)
}
export default ProjectList