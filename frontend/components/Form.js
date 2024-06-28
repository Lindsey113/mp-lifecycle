import React from 'react'

export default class Form extends React.Component {
  render() {
    
    return (
      <>
        <form id='todoForm' onSubmit={this.props.onTodoFormSubmit}>
          <input
            value={this.props.todoNameInput}
            onChange={this.props.onInputChange}
            type='text'
            placeholder='Type todo here'></input>
          <input type='submit'></input>
        </form>
        <button
          onClick={this.props.toggleDisplayCompleted}>
          {this.props.displayComplete ? 'Hide' : 'Show'} Completed Todos
        </button>
      </>
    )

  }
}
