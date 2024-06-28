import React from 'react'
import axios from 'axios'
import Form from './Form'
import TodoList from './TodoList'

const URL = 'http://localhost:9000/api/todos'

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      todos: [], 
      error: '',
      todoNameInput: '',
      displayComplete: true
    }
  }

  onInputChange = e => {
    const { value } = e.target
    this.setState({...this.state, todoNameInput: value})
  }

  resetForm = () => {
    this.setState({...this.state, todoNameInput: ''})
  }

  setResponseErr = err => this.setState({...this.state, error: err.response.data.message})

  postNewTodo = () => {
    axios.post(URL, {name: this.state.todoNameInput})
      .then(res => 
        this.setState({...this.state, todos: this.state.todos.concat(res.data.data)}),
        this.resetForm()
      )
      .catch(err => this.setState({...this.state, error: err.response.data.message}))
  }

  onTodoFormSubmit = e => {
    e.preventDefault()
    this.postNewTodo()
  }

  fetchTodos = () => {
    axios.get(URL)
    .then(res => {
      this.setState({...this.state, todos: res.data.data})
    })
    .catch(err => {
      this.setState({...this.state, error: err.response.data.message})
    })
}

   
  componentDidMount() {
   this.fetchTodos()
  }

  toggleCompleted = id => () => {
    axios.patch(`${URL}/${id}`)
      .then(res => {
        this.setState({...this.state, todos: this.state.todos.map(td => {
          if(td.id !== id) return td
          return res.data.data
        })})
      })
      .catch(err => console.log(err))
  }

  toggleDisplayCompleted = () => {
    this.setState({...this.state, displayComplete: !this.state.displayComplete})
  }

  render() {
    return (
      <div>
        <div id='error'>Error: {this.state.error}</div>
        <TodoList 
        todos={this.state.todos}
        displayComplete={this.state.displayComplete}
        toggleCompleted={this.toggleCompleted}
        />
        <Form 
        onTodoFormSubmit={this.onTodoFormSubmit}
        todoNameInput={this.state.todoNameInput}
        onInputChange={this.onInputChange}
        toggleDisplayCompleted={this.toggleDisplayCompleted}
        displayComplete={this.state.displayComplete}
        />
      </div>
    )
  }
}

export default App

