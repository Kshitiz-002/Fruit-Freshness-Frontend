import React from "react";

const InventoryItem = ({ fruit, onBuy, onAdd }) => {
  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h3 className="text-lg font-semibold">{fruit.name}</h3>
      <p>Freshness: {fruit.freshness}</p>
      {onBuy && (
        <button
          onClick={() => onBuy(fruit.id)}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Buy
        </button>
      )}
      {onAdd && (
        <button
          onClick={() => onAdd(fruit)}
          className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      )}
    </div>
  );
};

export default InventoryItem;
