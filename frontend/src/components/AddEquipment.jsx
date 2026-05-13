import { useState } from "react";
import axios from "axios";

function AddEquipment() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    quantity: "",
    availableQuantity: "",
    condition: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:5000/api/equipment", form)
      .then(() => {
        alert("Equipment Added");
        window.location.reload();
      })
      .catch(err => console.log(err));
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <h2>Add Equipment</h2>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} /><br />
        <input name="category" placeholder="Category" onChange={handleChange} /><br />
        <input name="quantity" placeholder="Quantity" onChange={handleChange} /><br />
        <input name="availableQuantity" placeholder="Available" onChange={handleChange} /><br />
        <input name="condition" placeholder="Condition" onChange={handleChange} /><br />

        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddEquipment;