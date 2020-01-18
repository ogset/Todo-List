import React, { Component } from "react";
import TodoItem from "./TodoItem";
import PropTypes from "prop-types";
class Todos extends Component {
  render() {
    return this.props.data.map(list => (
      <TodoItem
        key={list.id}
        data={list}
        markComplete={this.props.markComplete}
        delTodo={this.props.delTodo}
      />
    ));
  }
}

//Proptypes
Todos.propTypes = {
  data: PropTypes.array.isRequired
};

export default Todos;
