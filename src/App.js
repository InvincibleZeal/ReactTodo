import React, { Component } from 'react';
import TodoForm from './Components/TodoForm';
import TodoList from './Components/TodoList';
import './App.css';
const axios = require('axios');

class App extends Component {
  constructor() {
    super();
    this.state = { todos: []};
  }

  render() {
    return (
      <div className="App">
        <h1>To Do List</h1>
        <TodoForm onTodoAdd={this.handleTodoAdd} />
        <TodoList todos={this.state.todos}
          onTodoDelete={this.handleTodoDelete}
          onTodoUpdate={this.handleTodoUpdate}
        />
      </div>
    );
  }

  componentWillMount = () => {
    this.getData();
  }

  handleTodoAdd = (text) => {
    this.postData(text);
  }

  handleTodoDelete = (id) => {
    this.deleteData(id);
  }

  handleTodoUpdate  = (todo) => {
    this.updateData(todo);
  }

  updateData = (todo) => {
    axios.patch('http://localhost:4000/todos/' + todo.id, todo).then(() => this.getData());
  }

  deleteData = (id) => {
    axios.delete('http://localhost:4000/todos/' + id).then(() => this.getData());
  }

  postData = (text) => {
    let id;
    if(this.state.todos.length > 0) {
      id = this.state.todos[this.state.todos.length - 1].id + 1;
    } else {
      id = 1
    }
    axios.post('http://localhost:4000/todos', {
      id: id,
      text,
      completed: false
    }).then(() => this.getData());
  }

  getData = () => {
    axios.get('http://localhost:4000/todos').then(res => this.setState({ todos: res.data  }));
  }
}

export default App;
