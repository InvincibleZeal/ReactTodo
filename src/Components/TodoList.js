import React, { Component } from 'react';

class TodoList extends Component {
  render() {
    var { todos } = this.props;
    return (
      <ul className="TodoList">
        {
          todos.map((todo) => (
            <li 
              className="list-item" 
              todo={todo} 
              key={todo.id} >
              <span 
                id={"text-" + todo.id}
                onDoubleClick={this.onEditStart.bind(this, todo)}
                title="Tap to edit">{todo.text}
              </span>
              <form 
                id={"form-" + todo.id} 
                className="hidden" 
                onSubmit={this.onEditDone}>
                <input 
                  id={"edit-" + todo.id} 
                  type="text" 
                  defaultValue={todo.text} 
                  title="Press enter to submit" />
              </form>
              <img src="./delete.png" 
                onClick={this.onClick.bind(this, todo.id)} 
                title="Delete Item" alt="" />
            </li>
          ))
        }
      </ul>
    );
  }

  onClick = (id) => {
    this.props.onTodoDelete(id);
  }

  onEditDone = (e) => {
    e.preventDefault();
    let id = parseInt(e.target.id.slice(5));    
    let input = document.getElementById(`edit-${id}`);
    this.props.onTodoUpdate({id: id, text: input.value});
    document.getElementById(`edit-${id}`).parentElement.classList = "hidden";
    document.getElementById(`text-${id}`).classList = "";
  }

  onEditStart = (todo) => {
    let forms = document.getElementsByTagName("form");
    let texts = document.getElementsByTagName("span");

    for(let i=1; i<forms.length; i++) {
      forms[i].classList = "hidden";
      texts[i-1].className -= "hidden";
    }
    document.getElementById(`edit-${todo.id}`).parentElement.classList = "";
    document.getElementById(`text-${todo.id}`).classList = "hidden";
  }

}

export default TodoList;
