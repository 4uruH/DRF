import React from "react";
const ProjectItem = ({item}) => {
return (
    <tr>
        <td>{item.id}</td>
        <td>{item.project_name}</td>
    </tr>
)
}
const ProjectList = ({items}) => {
return (
    <table>
        <tr>
            <th>ID</th>
            <th>PROJECT_NAME</th>
        </tr>
        {items.map((item) => <ProjectItem item={item} />)}
    </table>
)
}
export default ProjectList