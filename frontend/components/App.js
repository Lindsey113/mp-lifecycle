import React from 'react'
import axios from 'axios'

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
        <div id='todos'>
          <h2>Todos:</h2>
          {
            this.state.todos.reduce((acc, td) => {
              if(this.state.displayComplete || !td.completed) return acc.concat(
                <div onClick={this.toggleCompleted(td.id)} key={td.id}>{td.name}{td.completed ? '  🗸' : ''}</div>
              )
              return acc
            }, [])
          }
        </div>
        <form id='todoForm' onSubmit={this.onTodoFormSubmit}>
          <input value={this.state.todoNameInput} onChange={this.onInputChange} type='text' placeholder='Type todo here'></input>
          <input type='submit'></input>
        </form>
        <button onClick={this.toggleDisplayCompleted}>{this.state.displayComplete ? 'Hide' : 'Show'} Completed Todos</button>
      </div>
    )
  }
}

export default App

