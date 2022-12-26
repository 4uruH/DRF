import React from 'react'


class ProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {project_name: '', users: props.users[0].id}
        }
    handleChange(event)
    {
        this.setState(
        {
            [event.target.name]: event.target.value
        }
    );
    }
    handleSubmit(event) {
        console.log(this.state.project_name)
        console.log(this.state.users)
    event.preventDefault()
    }
    render() {
        return (
            <form onSubmit={(event)=> this.handleSubmit(event)}>
                <div className="form-group">
                <label for="project_name">project_name</label>
                    <input type="text" className="form-control" name="project_name"
                    value={this.state.project_name} onChange={(event)=>this.handleChange(event)} />
                </div>
                <div className="form-group">
                    <label for="users">users</label>
                    <input type="number" className="form-control" name="users"
                value={this.state.users} onChange={(event)=>this.handleChange(event)} />
                </div>
            <input type="submit" className="btn btn-primary" value="Save" />
            </form>
        );
    }
}
export default ProjectForm