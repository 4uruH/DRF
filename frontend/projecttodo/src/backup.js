import React from 'react'

import UserList from "./components/users.js";
import ProjectList from "./components/projects";
import ToDoList from "./components/todo";
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import AuthorList from "./components/Author";
import BookList from "./components/Book";


class App extends React.Component {

    constructor(props) {
        super(props)
        const user1 = {id: 1, name: 'Грин', birthday_year: 1880}
        const user2 = {id: 2, name: 'Пушкин', birthday_year: 1799}
        const users = [user1, user2]
        const project1 = {id: 1, name: 'Алые паруса', user: user1}
        const project2 = {id: 2, name: 'Золотая цепь', user: user1}
        const project3 = {id: 3, name: 'Пиковая дама', user: user2}
        const project4 = {id: 4, name: 'Руслан и Людмила', user: user2}
        const projects = [project1, project2, project3, project4]
        const todo1 = {id:1, project: project1, text: 'afasdqd', user: user1}
        const todos = [todo1]
        this.state = {
        'users': users,
        'projects': projects,
        'todos': todos
    }
}
    render() {
        return (
         <div className="App">
            <BrowserRouter>
               <Routes>
                    <Route path='/' element={<UserList items={this.state.users} />} />
                    <Route path='/projects' element={<ProjectList items={this.state.projects} />} />
               </Routes>
            </BrowserRouter>
        </div>
        )
    }
}
export default App;