import React, { Component } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import CreateShoppingList from "./components/CreateShoppingList";
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

  nullId = () => {
    this.setState({
      id: null,
    });
  };

  render() {
    if (this.state.id !== null) {
      return (
        <BrowserRouter>
          <div className="App text-center mt-24">
            <Redirect push to={"/" + this.state.id} />
            <Route
              path="/:id"
              render={(props) => (
                <ShoppingList {...props} nullId={this.nullId} />
              )}
            />
          </div>
        </BrowserRouter>
      );
    }
    return (
      <BrowserRouter>
        <div className="App text-center mt-6">
          <Route exact path="/">
            <CreateShoppingList createShoppingList={this.createShoppingList}/>
          </Route>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
