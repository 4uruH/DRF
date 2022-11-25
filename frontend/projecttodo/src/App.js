import React from 'react'

import UserList from "./components/users.js";
import ProjectList from "./components/projects";
import ToDoList from "./components/todo";
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom'
import UserProjectList from "./components/userproject";
import axios from "axios";



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
        'todos': []
    }
}
  componentDidMount() {
    axios.get('http://127.0.0.1:8000/api/users')
        .then(response => {
            const users = response.data
            const projects = response.data
            const todos = response.data
              this.setState(
                {
                    'users': users,
                    'projects': projects,
                    'todos': todos
                }
            )
        }).catch(error => console.log(error))
    axios.get('http://127.0.0.1:8000/api/projects')
    .then(response => {
        const projects = response.data
          this.setState(
            {
                'projects': projects,
            }
        )
    }).catch(error => console.log(error))
      axios.get('http://127.0.0.1:8000/api/todo')
    .then(response => {
        const todos = response.data
          this.setState(
            {
                'todos': todos
            }
        )
    }).catch(error => console.log(error))

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
                            <Link to='/todos'>ToDos</Link>
                        </li>
                    </ul>
               </nav>
               <Routes>
                    <Route path='/' element={<UserList items={this.state.users} />} />
                    <Route path='/projects' element={<ProjectList items={this.state.projects} />} />
                    <Route path='/todos' element={<ToDoList items={this.state.todos} />} />
                    <Route th="/author/:id" element={<UserProjectList items={this.state.projects} />} />
                    <Route element={NotFound404} />
               </Routes>
            </BrowserRouter>
        </div>
        )
    }
}
export default App;