import React, { Component } from "react";
import AddItem from "./AddItem";
import socketIOClient from "socket.io-client";

let socket;

class ShoppingList extends Component {
  state = {
    id: null,
    products: [],
    /*socket: socketIOClient(
      "http://localhost:9000/" + this.props.match.params.id
    ),*/
  };

  componentDidMount() {
    this.setState({
      id: this.props.match.params.id,
    });
    socket = socketIOClient.connect("http://localhost:9000/" + this.props.match.params.id);
    this.socketListen();
    /*etInterval(() => {
      this.getItems();
    }, 1000);*/
    this.getItems();
  }

  socketListen = () => {
    socket.on("itemadded", (data) => {
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
    socket.emit("itemadded", {
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
      }),
    })
      .then((response) => response.json())
      .then(() => {
        this.getItems();
      });
  };

  updateBought = (item) => {
    fetch(
      "http://localhost:9000/" + this.props.match.params.id + "/" + item._id,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({
          product: item.product,
          quantity: item.quantity,
          quantityType: item.quantityType,
          bought: !item.bought,
        }),
      }
    )
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
        this.props.nullId();
        this.props.history.push('/');
      });
  };

  render() {
    const itemList = this.state.products.map((product) => {
      if (product.bought === false) {
        return (
          <div
            onClick={() => this.updateBought(product)}
            key={product._id}
            className="max-w-xs m-auto rounded shadow-lg bg-blue-400 mb-2 border-blue-600 py-2 px-6 border-b-8 text-blue-100 font-medium"
          >
            <h2>
              {product.product} {product.quantity} {product.quantityType}
            </h2>
            <button className="font-bold text-red-800" onClick={() => this.deleteItem(product)}>X</button>
          </div>
        );
      } else {
        return (
          <div
            onClick={() => this.updateBought(product)}
            key={product._id}
            className="max-w-xs m-auto rounded shadow-lg bg-green-400 mb-2 border-green-600 py-2 px-6 border-b-8 text-blue-100 font-medium"
          >
            <h2>
              {product.product} {product.quantity} {product.quantityType}
            </h2>
            <button className="font-bold text-red-800" onClick={() => this.deleteItem(product)}>X</button>
          </div>
        );
      }
    });

    return (
      <div>
        <h1 className="text-4xl font-bold text-blue-100 mb-10">
          Shopping list
        </h1>
        {itemList}
        <AddItem addItem={this.addItem} />
        <button onClick={this.deleteShoppingList}>Delete Shopping List</button>
      </div>
    );
  }
}

export default ShoppingList;
