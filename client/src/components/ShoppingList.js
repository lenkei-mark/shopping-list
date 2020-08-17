import React, { Component } from "react";
import AddItem from "./AddItem";
import { createBrowserHistory } from "history";

let history = createBrowserHistory();

class ShoppingList extends Component {
  state = {
    id: null,
    products: [],
  };

  componentDidMount() {
    this.setState({
      id: this.props.match.params.id,
    });
    this.getItems();
  }

  getItems = () => {
    fetch("http://localhost:9000/" + this.props.match.params.id)
      .then((data) => {
        return data.json();
      })
      .then((json) => {
        this.setState({
          products: json,
        });
      });
  };

  addItem = (item) => {
    fetch("http://localhost:9000/" + this.props.match.params.id, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        product: item.product,
        quantity: item.quantity,
        quantityType: item.quantityType,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        this.getItems();
      });
  };

  deleteItem = (product) => {
    fetch(
      "http://localhost:9000/" + this.props.match.params.id + "/" + product._id,
      {
        method: "DELETE",
      }
    )
      .then((response) => response.json())
      .then(() => {
        this.getItems();
      });
  };

  deleteShoppingList = () => {
    fetch("http://localhost:9000/" + this.props.match.params.id, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        history.push("/");
      });
  };

  render() {
    const itemList = this.state.products.map((product) => {
      return (
        <div key={product._id}>
          <h2>Product: {product.product}</h2>
          <h2>Quantity: {product.quantity}</h2>
          <h2>Quantity type: {product.quantityType}</h2>
          <button onClick={() => this.deleteItem(product)}>Delete</button>
        </div>
      );
    });

    return (
      <div>
        <h1>Shopping list</h1>
        {itemList}
        <AddItem addItem={this.addItem} />
        <button onClick={this.deleteShoppingList}>Delete Shopping List</button>
      </div>
    );
  }
}

export default ShoppingList;
