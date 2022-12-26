import React, {useState} from "react";


const ProjectItem = ({item, deleteProject}) => {
return (
    <tr>
        <td>{item.project_name}</td>
        <td>{item.id}</td>
        <td>{item.users}</td>
        <td><button onClick={()=>deleteProject(item.id)} type='button'>Delete</button></td>
    </tr>
)
}

const ProjectList = ({items, deleteProject}) => {
const [value, setValue] = useState('')
const filterredProjects = items.filter(item =>{
    return item.project_name.toLowerCase().includes(value.toLowerCase())
})
return (
    <div className="form">
        <form className="search__form">
            <input
                type="text"
                placeholder="serch project"
                className="search__input"
                onChange={(event) => setValue(event.target.value)}
            />
        </form>
    <table>
        <tr>
            <th>PROJECT_NAME</th>
            <th>PROJECT_id</th>
            <th>CREATED_USER</th>
            <th></th>
        </tr>
        {filterredProjects.map((item) => <ProjectItem item={item} deleteProject={deleteProject} />)}
    </table>
    </div>
)
}
export default ProjectList