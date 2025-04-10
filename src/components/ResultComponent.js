// import React from "react";

// const ResultComponent = ({ result }) => (
//   <div className="mt-6">
//     <h3 className="text-lg font-semibold">Result:</h3>
//     <p>
//       I think it’s a <b>{result.label}</b> with{" "}
//       <b>{result.percentage}%</b> confidence.
//     </p>
//     {result.qr_code_path && (
//       <div className="mt-4">
//         <h3 className="text-lg font-semibold">QR Code:</h3>
//         <img
//           src={`http://localhost:5000/${result.qr_code_path}`}
//           alt="QR Code"
//           className="mt-2 border border-gray-300 rounded"
//         />
//       </div>
//     )}
//   </div>
// );

// export default ResultComponent;

import React from "react";

const ResultComponent = ({ result }) => {
  const handleAddToInventory = async () => {
    if (result.percentage < 50) {
      alert("The fruit is not fresh enough to be added to the inventory.");
      return;
    }

    const productData = {
      label: result.label,
      percentage: result.percentage,
      qr_code_path: result.qr_code_path,
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/sellerinventory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        alert("Product added to inventory successfully!");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Failed to add product to inventory:", error);
      alert("Failed to add product to inventory. Please try again.");
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold">Result:</h3>
      <p>
        I think it’s a <b>{result.label}</b> with <b>{result.percentage}%</b>{" "}
        confidence.
      </p>
      {result.qr_code_path && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">QR Code:</h3>
          <img
            src={`http://127.0.0.1:5000/${
              result.qr_code_path
            }?t=${new Date().getTime()}`}
            alt="QR Code"
            className="mt-2 border border-gray-300 rounded"
          />
        </div>
      )}
      <button
        onClick={handleAddToInventory}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Add to Inventory
      </button>
    </div>
  );
};

export default ResultComponent;

// import React from "react";

// const ResultComponent = ({ result }) => (
//   <div className="mt-6">
//     <h3 className="text-lg font-semibold">Result:</h3>
//     <p>
//       I think it’s a <b>{result.label}</b> with{" "}
//       <b>{result.percentage}%</b> confidence.
//     </p>

//     <button
//       onClick={async () => {
//         try {
//           const response = await fetch("http://127.0.0.1:5000/sellerinventory", {
//             method: "POST",
//             body: result,
//             headers: {
//               "Content-Type": "application/json",  // Ensure the content type is JSON
//             },
//           });

//           if (response.ok) {
//             // const result = await response.json();
//             alert("Item added!");
//           } else {
//             const error = await response.json();
//             alert(error.message);
//           }
//         } catch (err) {
//           console.error("Error during classification:", err);
//           alert("An error occurred while connecting to the server.");
//         }
//       }}
//       className="bg-emerald-600 text-white text-sm py-2 px-6 rounded-lg hover:bg-emerald-700"
//     >
//       Add
//     </button>
//   </div>
// );

// export default ResultComponent;

// const ResultComponent = ({ result }) => (
//   <div className="mt-6">
//     <h3 className="text-lg font-semibold">Result:</h3>
//     <p>
//       I think it’s a <b>{result.label}</b> with{" "}
//       <b>{result.percentage}%</b> confidence.
//     </p>

//     <button
//       onClick={async () => {
//         try {
//           console.log('Sending to server:', result);  // Log the result
//           const response = await fetch("http://127.0.0.1:5000/sellerinventory", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify(result),
//           });

//           if (response.ok) {
//             alert("Item added!");
//           } else {
//             const error = await response.json();
//             alert(error.message);
//           }
//         } catch (err) {
//           console.error("Error during classification:", err);
//           alert("An error occurred while connecting to the server.");
//         }
//       }}
//       className="bg-emerald-600 text-white text-sm py-2 px-6 rounded-lg hover:bg-emerald-700"
//     >
//       Add
//     </button>
//   </div>
// );

// export default ResultComponent;
