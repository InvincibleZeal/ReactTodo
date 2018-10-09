import React, { Component } from 'react';

class TodoForm extends Component {
  render() {
    return (
      <div className="TodoForm">
        <form onSubmit={this.onSubmit.bind(this)}>
          <input type="text" id="text" />
        </form>
      </div>
    );
  }

  onSubmit = (e) => {
    e.preventDefault();
    var text = document.getElementById('text').value;
    if (text) {
      this.props.onTodoAdd(text);
    }
    e.target.reset();
  }
}

export default TodoForm;
