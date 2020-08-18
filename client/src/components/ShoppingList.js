import React, { Component } from "react";
import AddItem from "./AddItem";
import socketIOClient from "socket.io-client";

class ShoppingList extends Component {
  state = {
    id: null,
    products: [],
    socket: socketIOClient.connect(
      "http://localhost:9000/" + this.props.match.params.id
    ),
  };

  componentDidMount() {
    this.setState({
      id: this.props.match.params.id,
    });
    this.socketListen();
    this.getItems();
  }

  socketListen = () => {
    this.state.socket.on("item_added", (data) => {
      let products = [...this.state.products, data];
      this.setState({
        products: products,
      });
    });
  };

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
    this.state.socket.emit("item_added", {
      item,
    });
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
        bought: item.bought
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
      .then(() => {});
  };

  render() {
    const itemList = this.state.products.map((product) => {
      if(product.bought === false){
        return (
          <div onClick={() => {console.log("clicked card")}} key={product._id} className="max-w-sm m-auto rounded shadow-lg bg-blue-400 mb-2 border-blue-600 py-2 px-6 border-b-8">
            <h2>Product: {product.product}</h2>
            <h2>Quantity: {product.quantity}</h2>
            <h2>Quantity type: {product.quantityType}</h2>
            <button onClick={() => this.deleteItem(product)}>Delete</button>
          </div>
        );
      } else {
        return (
          <div onClick={() => {console.log("clicked card")}} key={product._id} className="max-w-sm m-auto rounded shadow-lg bg-green-400 mb-2 border-green-600 py-2 px-6 border-b-8">
            <h2>Product: {product.product}</h2>
            <h2>Quantity: {product.quantity}</h2>
            <h2>Quantity type: {product.quantityType}</h2>
            <button onClick={() => this.deleteItem(product)}>Delete</button>
          </div>
        );
      }
    });

    return (
      <div>
        <h1 className="text-4xl font-bold text-blue-100 mb-10">Shopping list</h1>
        {itemList}
        <AddItem addItem={this.addItem} />
        <button onClick={this.deleteShoppingList}>Delete Shopping List</button>
      </div>
    );
  }
}

export default ShoppingList;
