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
                className={todo.completed ? 'completed' : 'incomplete'}
                onDoubleClick={this.onEditStart.bind(this, todo)}
                title="Tap to edit">

                {todo.text}
              </span>

              <form
                id={"form-" + todo.id}
                className="hidden"
                onSubmit={this.onEditDone.bind(this, todo)}>
                <input
                  id={"edit-" + todo.id}
                  type="text"
                  defaultValue={todo.text}
                  title="Press enter to submit" />
              </form>

              <div className="imgs">
                { todo.completed ?
                  <img src="images/fill.svg"
                    onClick={this.onCompleteClick.bind(this, todo)}
                    title="Completed" alt=""
                  /> :
                  <img src="images/empty.svg"
                    onClick={this.onCompleteClick.bind(this, todo)}
                    title="Complete" alt=""
                  />
                }
                <img src="images/garbage.svg"
                  className="delete-img"
                  onClick={this.onDeleteClick.bind(this, todo.id)}
                  title="Delete Item" alt=""
                />
              </div>

            </li>
          ))
        }
      </ul>
    );
  }

  onDeleteClick = (id) => {
    this.props.onTodoDelete(id);
  }

  onCompleteClick = (todo) => {
    todo.completed = !todo.completed;
    this.props.onTodoUpdate(todo);
  }

  onEditDone = (todo, e) => {
    e.preventDefault();
    let { id, completed } = todo;
    let input = document.getElementById(`edit-${id}`);
    this.props.onTodoUpdate({id, text: input.value, completed });
    this.refreshInlineForms();
  }

  onEditStart = (todo) => {
    this.refreshInlineForms();
    document.getElementById(`edit-${todo.id}`).parentElement.classList.remove('hidden');
    document.getElementById(`text-${todo.id}`).classList.add('hidden');
  }

  refreshInlineForms = () => {
    let forms = document.getElementsByTagName("form");
    let texts = document.getElementsByTagName("span");

    for(let i=1; i<forms.length; i++) {
      forms[i].classList.add('hidden');
      texts[i-1].classList.remove('hidden');
    }
  }

}

export default TodoList;
