import React from "react"

class TodosList extends React.Component {
  render() {
    return (
      <ul>
        {this.props.todos.map(x => (
          <li>{x.title}</li>
        ))}
      </ul>
    );
  }
}

export default TodosList