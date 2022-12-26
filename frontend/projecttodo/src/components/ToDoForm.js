import React from 'react'


class ToDoForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {todo_text: '', create_user: props.users[0].id, from_project:props.from_project[0].id}
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
        console.log(this.state.todo_text)
        console.log(this.state.create_user)
        console.log(this.state.from_project)
    event.preventDefault()
    }
    render() {
        return (
            <form onSubmit={(event)=> this.handleSubmit(event)}>
                <div className="form-group">
                <label for="todo_text">todo_text</label>
                    <input type="text" className="form-control" name="todo_text"
                    value={this.state.todo_text} onChange={(event)=>this.handleChange(event)} />
                </div>
                <div className="form-group">
                    <label for="create_user">create_user</label>
                    <input type="number" className="form-control" name="create_user"
                value={this.state.create_user} onChange={(event)=>this.handleChange(event)} />
                </div>
                <div className="form-group">
                    <label htmlFor="from_project">from_project</label>
                    <input type="number" className="form-control" name="from_project"
                           value={this.state.from_project} onChange={(event) => this.handleChange(event)}/>
                </div>
            <input type="submit" className="btn btn-primary" value="Save" />
            </form>
        );
    }
}
export default ToDoForm