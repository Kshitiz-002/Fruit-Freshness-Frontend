// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import InventoryItem from "../components/InventoryItem"; // Component for each fruit in the inventory
// import ParticleBackground from "../components/ParticleBackground"; // Background component
// import { Link } from "react-router-dom"; // For navigation links

// const InventoryPage = ({ userType }) => {
//   const [inventory, setInventory] = useState([]);

//   useEffect(() => {
//     // Fetch inventory data from your API
//     const fetchInventory = async () => {
//       try {
//         const response = await axios.get("YOUR_API_ENDPOINT_FOR_INVENTORY");
//         setInventory(response.data); // Assuming the response contains a list of fruits in the inventory
//       } catch (error) {
//         console.error("Error fetching inventory:", error);
//       }
//     };

//     fetchInventory();
//   }, []);

//   const handleBuyFruit = async (fruitId) => {
//     try {
//       // API call to remove fruit from inventory
//       const response = await axios.post("YOUR_API_ENDPOINT_TO_REMOVE_FRUIT", { fruitId });
//       if (response.status === 200) {
//         setInventory((prev) => prev.filter((fruit) => fruit.id !== fruitId)); // Remove from local state
//         alert("Fruit successfully purchased!");
//       }
//     } catch (error) {
//       console.error("Error purchasing fruit:", error);
//     }
//   };

//   return (
//     <div className="relative min-h-screen overflow-hidden">
//       {/* Untouchable particle background */}
//       <div className="absolute inset-0 z-0 pointer-events-none">
//         <ParticleBackground />
//       </div>

//       {/* Content wrapper */}
//       <div className="relative z-10">
//         {/* Header */}
//         <header className="bg-white shadow-md p-4 flex justify-between items-center">
//           <h1 className="text-xl font-semibold">Inventory Management</h1>
//           <nav className="flex space-x-4">
//             <Link
//               to="/dashboard"
//               className="text-blue-500 hover:text-blue-700 font-medium"
//             >
//               Dashboard
//             </Link>
//             <Link
//               to="/inventory"
//               className="text-blue-500 hover:text-blue-700 font-medium"
//             >
//               {userType === "Seller" ? "Manage Fruits" : "Browse Fruits"}
//             </Link>
//           </nav>
//         </header>

//         {/* Inventory content */}
//         <div className="container mx-auto p-6">
//           <h1 className="text-4xl font-semibold text-center mb-6">Inventory</h1>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {inventory.map((fruit) => (
//               <InventoryItem
//                 key={fruit.id}
//                 fruit={fruit}
//                 onBuy={userType === "Buyer" ? handleBuyFruit : null} // Buyer can buy fruits
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InventoryPage;








// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import InventoryItem from "../components/InventoryItem";
// import ParticleBackground from "../components/ParticleBackground";
// import { Link } from "react-router-dom";

// const InventoryPage = ({ userType }) => {
//   const [inventory, setInventory] = useState([]);
//   const [myInventory, setMyInventory] = useState([]);

//   // Fetch inventory data based on user type
//   useEffect(() => {
//     const fetchInventory = async () => {
//       try {
//         const endpoint =
//           userType === "Seller"
//             ? "/api/seller/inventory"
//             : "/api/buyer/inventory";
//         const response = await axios.get(endpoint);
//         setInventory(response.data);
//       } catch (error) {
//         console.error("Error fetching inventory:", error);
//       }
//     };

//     // Fetch personal inventory for buyers
//     const fetchMyInventory = async () => {
//       if (userType === "Buyer") {
//         try {
//           const response = await axios.get("/api/buyer/my-inventory");
//           setMyInventory(response.data);
//         } catch (error) {
//           console.error("Error fetching personal inventory:", error);
//         }
//       }
//     };

//     fetchInventory();
//     fetchMyInventory();
//   }, [userType]);

//   // Add a fruit (Seller or Buyer depending on the userType)
//   const handleAddFruit = async () => {
//     const fruitName = prompt("Enter the fruit name:");
//     if (!fruitName) return;

//     const fruitData = {
//       name: fruitName,
//       freshness: "Fresh", // Assume freshness for this demo
//       addedBy: userType === "Seller" ? "SellerID" : "BuyerID",
//     };

//     try {
//       const endpoint =
//         userType === "Seller"
//           ? "/api/seller/add"
//           : "/api/buyer/add";
//       const response = await axios.post(endpoint, fruitData);
//       if (response.status === 200) {
//         setInventory((prev) => [...prev, response.data]);
//         alert("Fruit added successfully!");
//       }
//     } catch (error) {
//       console.error("Error adding fruit:", error);
//     }
//   };

//   // Buy fruit for buyers
//   const handleBuyFruit = async (fruitId) => {
//     try {
//       const response = await axios.post("/api/buyer/buy", { fruitId });
//       if (response.status === 200) {
//         setInventory((prev) =>
//           prev.filter((fruit) => fruit.id !== fruitId)
//         );
//         setMyInventory((prev) => [...prev, response.data]);
//         alert("Fruit purchased successfully!");
//       }
//     } catch (error) {
//       console.error("Error purchasing fruit:", error);
//     }
//   };

//   return (
//     <div className="relative min-h-screen bg-gray-100">
//       <ParticleBackground />

//       {/* Modern Header */}
//       <header className="fixed top-0 left-0 w-full bg-white shadow-md z-20">
//         <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
//           <h1 className="text-2xl font-bold text-gray-800">Fruit Inventory</h1>
//           <nav className="flex items-center space-x-4">
//             <Link
//               to="/dashboard"
//               className="text-blue-600 hover:text-blue-800 font-medium"
//             >
//               Dashboard
//             </Link>
//             {userType === "Seller" && (
//               <button
//                 onClick={handleAddFruit}
//                 className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//               >
//                 Add Fruit
//               </button>
//             )}
//           </nav>
//         </div>
//       </header>

//       {/* Main Content */}
//       <div className="relative z-10 pt-20 px-4 max-w-6xl mx-auto">
//         {/* Inventory Section */}
//         <section className="mt-6">
//           <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//             {userType === "Seller" ? "Your Inventory" : "Fruits Available for Purchase"}
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {inventory.map((fruit) => (
//               <InventoryItem
//                 key={fruit.id}
//                 fruit={fruit}
//                 onBuy={userType === "Buyer" ? handleBuyFruit : null}
//               />
//             ))}
//           </div>
//         </section>

//         {/* Personal Inventory for Buyers */}
//         {userType === "Buyer" && (
//           <section className="mt-10">
//             <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//               Your Inventory
//             </h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {myInventory.map((fruit) => (
//                 <InventoryItem key={fruit.id} fruit={fruit} />
//               ))}
//             </div>
//           </section>
//         )}
//       </div>
//     </div>
//   );
// };

// export default InventoryPage;







// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import InventoryItem from "../components/InventoryItem";
// import ParticleBackground from "../components/ParticleBackground";
// import { Link } from "react-router-dom";

// const InventoryPage = ({ userType }) => {
//   const [inventory, setInventory] = useState([]);
//   const [myInventory, setMyInventory] = useState([]);

//   // Fetch inventory data based on user type
//   useEffect(() => {
//     const fetchInventory = async () => {
//       try {
//         const endpoint =
//           userType === "Seller"
//             ? "/api/seller/inventory" // Seller's inventory
//             : "/api/buyer/inventory"; // Buyer's available fruits for purchase
//         const response = await axios.get(endpoint);
//         setInventory(response.data); // Update inventory state
//       } catch (error) {
//         console.error("Error fetching inventory:", error);
//       }
//     };

//     // Fetch personal inventory for buyers (purchased fruits)
//     const fetchMyInventory = async () => {
//       if (userType === "Buyer") {
//         try {
//           const response = await axios.get("/api/buyer/my-inventory");
//           setMyInventory(response.data); // Update my inventory (purchased fruits)
//         } catch (error) {
//           console.error("Error fetching personal inventory:", error);
//         }
//       }
//     };

//     fetchInventory();
//     fetchMyInventory();
//   }, [userType]);

//   // Add a fruit (for Seller or Buyer depending on userType)
//   const handleAddFruit = async () => {
//     const fruitName = prompt("Enter the fruit name:");
//     if (!fruitName) return;

//     const fruitData = {
//       name: fruitName,
//       freshness: "Fresh", // Default freshness for simplicity
//       addedBy: userType === "Seller" ? "SellerID" : "BuyerID", // Replace with actual user ID
//     };

//     try {
//       const endpoint =
//         userType === "Seller"
//           ? "/api/seller/add" // Seller adds fruits
//           : "/api/buyer/add"; // Buyers may have a different endpoint
//       const response = await axios.post(endpoint, fruitData);
//       if (response.status === 200) {
//         setInventory((prev) => [...prev, response.data]); // Update the inventory after adding
//         alert("Fruit added successfully!");
//       }
//     } catch (error) {
//       console.error("Error adding fruit:", error);
//     }
//   };

//   // Buy fruit for buyers
//   const handleBuyFruit = async (fruitId) => {
//     try {
//       const response = await axios.post("/api/buyer/buy", { fruitId });
//       if (response.status === 200) {
//         // Remove fruit from available inventory
//         setInventory((prev) => prev.filter((fruit) => fruit.id !== fruitId));
//         // Add to personal inventory (buyer)
//         setMyInventory((prev) => [...prev, response.data]);
//         alert("Fruit purchased successfully!");
//       }
//     } catch (error) {
//       console.error("Error purchasing fruit:", error);
//     }
//   };

//   return (
//     <div className="relative min-h-screen bg-gray-100">
//       <ParticleBackground />

//       {/* Modern Header */}
//       <header className="fixed top-0 left-0 w-full bg-white shadow-md z-20">
//         <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
//           <h1 className="text-2xl font-bold text-gray-800">Fruit Inventory</h1>
//           <nav className="flex items-center space-x-4">
//             <Link
//               to="/dashboard"
//               className="text-blue-600 hover:text-blue-800 font-medium"
//             >
//               Dashboard
//             </Link>
//             {userType === "Seller" && (
//               <button
//                 onClick={handleAddFruit}
//                 className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//               >
//                 Add Fruit
//               </button>
//             )}
//           </nav>
//         </div>
//       </header>

//       {/* Main Content */}
//       <div className="relative z-10 pt-20 px-4 max-w-6xl mx-auto">
//         {/* Inventory Section */}
//         <section className="mt-6">
//           <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//             {userType === "Seller" ? "Your Inventory" : "Fruits Available for Purchase"}
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {inventory.map((fruit) => (
//               <InventoryItem
//                 key={fruit.id}
//                 fruit={fruit}
//                 onBuy={userType === "Buyer" ? handleBuyFruit : null}
//               />
//             ))}
//           </div>
//         </section>

//         {/* Personal Inventory for Buyers */}
//         {userType === "Buyer" && (
//           <section className="mt-10">
//             <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//               Your Inventory
//             </h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {myInventory.map((fruit) => (
//                 <InventoryItem key={fruit.id} fruit={fruit} />
//               ))}
//             </div>
//           </section>
//         )}
//       </div>
//     </div>
//   );
// };

// export default InventoryPage;





import React, { useEffect, useState } from "react";
import axios from "axios";
import InventoryItem from "../components/InventoryItem"; // Component for each fruit in the inventory
import ParticleBackground from "../components/ParticleBackground"; // Background component
import { Link } from "react-router-dom"; // For navigation links

const InventoryPage = ({ userType, userId }) => {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    // Fetch inventory data from your API
    const fetchInventory = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/sellerinventory");
        setInventory(response.data); // Assuming the response contains a list of fruits in the inventory
      } catch (error) {
        console.error("Error fetching inventory:", error);
      }
    };

    fetchInventory();
  }, []);

  const handleBuyFruit = async (data) => {
    try {
      // API call to add fruit to seller inventory
      const response = await axios.post("http://127.0.0.1:5000/sellerinventory", JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json", // Ensure that the content type is application/json
        },
      });

      if (response.status === 200) {
        setInventory(response.data);
        alert("Fruit successfully added to seller inventory!");
      }
    } catch (error) {
      console.error("Error adding fruit to inventory:", error);
      alert("An error occurred while adding the fruit to the inventory.");
    }
  };



  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Untouchable particle background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <ParticleBackground />
      </div>

      {/* Content wrapper */}
      <div className="relative z-10">
        {/* Header */}
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Inventory Management</h1>
          <nav className="flex space-x-4">
            <Link
              to="/dashboard"
              className="text-blue-500 hover:text-blue-700 font-medium"
            >
              Dashboard
            </Link>
            <Link
              to="/inventory"
              className="text-blue-500 hover:text-blue-700 font-medium"
            >
              {userType === "Seller" ? "Manage Fruits" : "Browse Fruits"}
            </Link>
          </nav>
        </header>

        {/* Inventory content */}
        <div className="container mx-auto p-6">
          <h1 className="text-4xl font-semibold text-center mb-6">Browse</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {inventory.map((fruit) => (
              <InventoryItem
                key={fruit.id}
                fruit={fruit}
                onBuy={userType === "Buyer" ? handleBuyFruit : null} // Buyer can buy fruits
                isBuyable={true}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryPage;
