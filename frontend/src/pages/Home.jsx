import { useEffect, useState } from "react";
import axios from "axios";
import AddEquipment from "../components/AddEquipment";

function Home() {
  const [equipment, setEquipment] = useState([]);

  const loadData = () => {
    axios.get("http://localhost:5000/api/equipment")
      .then(res => setEquipment(res.data))
      .catch(err => console.log(err));
  };
  const deleteItem = (id) => {
  axios.delete(`http://localhost:5000/api/equipment/${id}`)
    .then(() => {
      alert("Deleted");
      setEquipment(equipment.filter(item => item._id !== id));
    })
    .catch(err => console.log(err));
};

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Lab Equipment System</h1>

      <AddEquipment />

      <h2>All Equipment</h2>

      {equipment.map((item) => (
        <div key={item._id} style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
          <h3>{item.name}</h3>
          <p>Category: {item.category}</p>
          <p>Available: {item.availableQuantity}</p>
          <button onClick={() => deleteItem(item._id)}>
  Delete
</button>
        </div>
      ))}
    </div>
  );
}

export default Home;