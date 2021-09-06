import React from "react"

import TodoItem from "./TodoItem"

class TodosList extends React.Component {
  render() {
    return (
      <ul>
        {this.props.todos.map(x => (
          <TodoItem 
            key={x.id} 
            todo={x}
            handleChangeProps={this.props.handleChangeProps}
            deleteTodoProps={this.props.deleteTodoProps}
          />
        ))}
      </ul>
    );
  }
}

export default TodosList