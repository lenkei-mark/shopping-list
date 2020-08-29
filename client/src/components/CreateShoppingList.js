import React from "react";

const CreateShoppingList = ({ createShoppingList }) => {
  return (
    <div>
      <h1>
        <button
          className="bg-blue-500 text-4xl hover:bg-blue-400 text-white font-bold py-4 px-8 border-b-8 border-blue-600 hover:border-blue-500 rounded"
          onClick={() => {createShoppingList()}}
        >
          Create your shopping list
        </button>
      </h1>
      <h1 className="text-2xl font-bold text-white mt-12">
        Your online shareable shopping list
      </h1>
    </div>
  );
};

export default CreateShoppingList;
