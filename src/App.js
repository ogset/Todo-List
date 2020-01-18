import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Todos from "./components/todo/Todos";
import Header from "./components/layout/Header";
import AddToDo from "./components/AddToDo/AddToDo";
import About from "./components/pages/about";
import axios from "axios";
class App extends Component {
  state = {
    todos: []
  };
  componentDidMount() {
    axios
      .get("https://jsonplaceholder.typicode.com/todos?_limit=10")
      .then(response => this.setState({ todos: response.data }));
  }

  markComplete = id => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    });
  };
  delTodo = id => {
    axios
      .delete("https://jsonplaceholder.typicode.com/todos/" + id)
      .then(response =>
        this.setState({
          todos: [...this.state.todos.filter(todo => todo.id !== id)]
        })
      );
  };
  addTodo = title => {
    axios
      .post("https://jsonplaceholder.typicode.com/todos", {
        title,
        completed: false
      })
      .then(response =>
        this.setState({ todos: [...this.state.todos, response.data] })
      );
  };
  render() {
    return (
      <Router>
        <div className="container">
          <Header />
          <Route
            path="/"
            exact
            render={props => (
              <React.Fragment>
                <AddToDo addTodo={this.addTodo} />
                <Todos
                  data={this.state.todos}
                  markComplete={this.markComplete}
                  delTodo={this.delTodo}
                />
              </React.Fragment>
            )}
          />
          <Route path="/about" component={About} />
        </div>
      </Router>
    );
  }
}

export default App;
