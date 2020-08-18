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
      <div className="mt-12">
        <form
          onSubmit={this.handleSubmit}
          className="w-full max-w-sm text-blue-100 m-auto"
        >
          <div className="flex mb-4">
            <div className="w-1/3">
              <label className="mr-2 font-bold">Product: </label>
            </div>
            <div className="w-2/3">
              <input
                className="rounded text-black"
                type="text"
                id="product"
                placeholder="Name of the product"
                onChange={this.handleChange}
                value={this.state.product}
                required
              />
            </div>
          </div>
          <div className="flex mb-4 items-center">
            <div className="w-1/3">
              <label className="mr-2 font-bold">Quantity: </label>
            </div>
            <div className="w-2/3">
              <input
                className="rounded text-black"
                type="number"
                id="quantity"
                onChange={this.handleChange}
                value={this.state.quantity}
                required
              />
            </div>
          </div>
          <div className="flex mb-4 items-center">
            <div className="w-1/3">
              <label className="mr-2 font-bold">Quantity Type: </label>
            </div>
            <div className="w-2/3">
              <input
                className="rounded text-black"
                type="text"
                id="quantityType"
                placeholder="kg/liter/piece/pack/etc."
                onChange={this.handleChange}
                value={this.state.quantityType}
              />
            </div>
          </div>
          <button className="bg-blue-500 hover:bg-blue-700 text-blue-100 font-bold py-2 px-4 rounded">Add Item</button>
        </form>
      </div>
    );
  }
}

export default AddItem;
