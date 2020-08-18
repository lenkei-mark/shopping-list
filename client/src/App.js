import React, { Component } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import ShoppingList from "./components/ShoppingList";

class App extends Component {
  state = {
    products: [],
    id: null,
  };

  createShoppingList = () => {
    fetch("http://localhost:9000/")
      .then((data) => {
        return data.json();
      })
      .then((json) => {
        this.setState({
          id: json._id,
        });
      });
  };

  /*componentDidMount(){
    this.createShoppingList();
  }*/

  handleClick = () => {
    this.createShoppingList();
  };

  render() {
    if (this.state.id !== null) {
      return (
        <BrowserRouter>
          <div className="App text-center mt-24">
            <Redirect push to={"/" + this.state.id} />
            <Route path="/:id" component={ShoppingList} />
          </div>
        </BrowserRouter>
      );
    }
    return (
      <BrowserRouter>
        <div className="App text-center mt-6">
          <Route exact path="/">
            <h1>
              <button
                className="bg-blue-500 text-4xl hover:bg-blue-400 text-white font-bold py-4 px-8 border-b-8 border-blue-600 hover:border-blue-500 rounded"
                onClick={this.handleClick}
              >
                Create your shopping list
              </button>
            </h1>
            <h1 className="text-2xl font-bold text-white mt-12">
              Your online shareable shopping list
            </h1>
          </Route>
          <Route path="/:id" component={ShoppingList} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
