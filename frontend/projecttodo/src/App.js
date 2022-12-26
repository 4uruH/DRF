import React from 'react'

import UserList from "./components/users.js";
import ProjectList from "./components/projects";
import ToDoList from "./components/todo";
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom'
import UserProjectList from "./components/userproject";
import LoginForm from './components/Auth.js'
import axios from "axios";
import Cookies from 'universal-cookie';
import ProjectForm from "./components/ProjectForm";
import ToDoForm from "./components/ToDoForm";



const NotFound404 = ({ location }) => {
    return (
        <div>
            <h1>Страница по адресу '{location.pathname}' не найдена</h1>
        </div>
    )
    }

class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
        'users': [],
        'projects': [],
        'todos': [],
        'token': ''
        }
    }

    deleteProject(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/projects/${id}`, {headers, headers})
            .then(response => {
                this.setState({projects: this.state.projects.filter((item)=>item.id !== id)})
            }).catch(error => console.log(error))
    }

    createProject(project_name, users) {
        const headers = this.get_headers()
        const data = {project_name: project_name, users: users}
        axios.post(`http://127.0.0.1:8000/api/projects/`, data, {headers, headers})
            .then(response => {
            let new_project = response.data
            const users = this.state.users.filter((item) => item.id === new_project.users)[0]
        new_project.users = users
        this.setState({projects: [...this.state.projects, new_project]})
        }).catch(error => console.log(error))
        }


    deleteTodo(id) {
    const headers = this.get_headers()
    axios.delete(`http://127.0.0.1:8000/api/todo/${id}`, {headers, headers})
        .then(response => {
            this.setState({todos: this.state.todos.filter((item)=>item.id !== id)})
        }).catch(error => console.log(error))
    }

    createToDo(from_project, todo_text, create_user) {
    const headers = this.get_headers()
    const data = {from_project: from_project, todo_text: todo_text, create_user: create_user}
    axios.post(`http://127.0.0.1:8000/api/todos/`, data, {headers, headers})
        .then(response => {
        let new_todo = response.data
        const from_project = this.state.from_project.filter((item) => item.id === new_todo.from_project)[0]
    new_todo.from_project = from_project
        const create_user = this.state.create_user.filter((item) => item.id === new_todo.create_user)[0]
    new_todo.create_user = create_user
    this.setState({projects: [...this.state.todos, new_todo]})
    }).catch(error => console.log(error))
    }


    set_token(token) {
         const cookies = new Cookies()
                cookies.set('token', token)
            this.setState({'token': token}, ()=>this.load_data())

    }
    is_authenticated() {
        return this.state.token !== ''
    }
    logout() {
        this.set_token('')
    }

    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token}, ()=>this.load_data())
    }
    get_token(username, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username, password: password})
            .then(response => {
                this.set_token(response.data['token'])
        }).catch(error => alert('Неверный логин или пароль'))
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.is_authenticated())
        {
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }


    load_data() {
        const headers = this.get_headers()
        axios.get('http://127.0.0.1:8000/api/users/', {headers})
            .then(response => {
                this.setState({users: response.data})
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/projects/', {headers})
            .then(response => {
                this.setState({projects: response.data})
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/todo/', {headers})
            .then(response => {
                this.setState({todos: response.data})
            }).catch(error => console.log(error))
        this.setState({todos: []})

    }

  componentDidMount() {

    this.get_token_from_storage()

  }


    render() {
        return (
         <div className="App">
            <BrowserRouter>
               <nav>
                    <ul>
                        <li>
                            <Link to='/'>Users</Link>
                        </li>
                        <li>
                            <Link to='/projects'>Projects</Link>
                        </li>
                        <li>
                            <Link to='/projects/create'>Create Project</Link>
                        </li>
                        <li>
                            <Link to='/todos/create'>Create ToDos</Link>
                        </li>
                        <li>
                            <Link to='/todos'>ToDos</Link>
                        </li>
                        <li>
                            {this.is_authenticated() ? <button
                                onClick={()=>this.logout()}>Logout</button> : <Link to='/login'>Login</Link>}
                        </li>
                    </ul>
               </nav>
               <Routes>
                    <Route path='/' element={<UserList items={this.state.users} />} />
                    <Route path='/projects' element={<ProjectList items={this.state.projects} users={this.state.users} deleteProject={(id)=>this.deleteProject(id)}  />} />
                    <Route path='/projects/create' element={<ProjectForm createProject={(project_name, users) => this.createProject(project_name, users)} />} />} />
                    <Route path='/todos/create' element={<ToDoForm createToDo={(from_project, todo_text, create_user) => this.createToDo(from_project, todo_text, create_user)} />} />
                    <Route path='/todos' element={<ToDoList items={this.state.todos} deleteTodo={(id)=>this.deleteTodo(id)} />} />
                    <Route path='/login' element={<LoginForm get_token={(username, password) => this.get_token(username, password)} />} />
                    <Route path="/user/:id" element={<UserProjectList items={this.state.projects} />} />
                    <Route element={NotFound404} />
               </Routes>
            </BrowserRouter>
        </div>
        )
    }
}
export default App;