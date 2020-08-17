import React, { Component } from "react";

class AddItem extends Component {
  state = {
    product: "",
    quantity: 0,
    quantityType: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addItem(this.state);
    this.setState({
      product: "",
      quantity: 0,
      quantityType: "",
    });
  };

  render() {
    return (
      <div>
        <h1>Add Item</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="product">Product: </label>
          <input
            type="text"
            id="product"
            onChange={this.handleChange}
            value={this.state.product}
          />
          <label htmlFor="quantity">Quantity: </label>
          <input
            type="number"
            id="quantity"
            onChange={this.handleChange}
            value={this.state.quantity}
          />
          <label htmlFor="quantity">Quantity Type: </label>
          <input
            type="text"
            id="quantityType"
            onChange={this.handleChange}
            value={this.state.quantityType}
          />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default AddItem;
