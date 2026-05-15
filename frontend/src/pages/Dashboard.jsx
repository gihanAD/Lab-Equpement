import { useEffect, useState } from "react";
import API from "../api/api";

export default function Dashboard() {
  const [equipment, setEquipment] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const eq = await API.get("/equipment");
    const us = await API.get("/users");

    setEquipment(eq.data);
    setUsers(us.data);
  };

  return (
    <div className="page">
      <div className="panel">

        <div className="title">📊 Dashboard</div>

        <div className="stats">
          <div className="stat">📦 Equipment<br /><b>{equipment.length}</b></div>
          <div className="stat">👨‍🎓 Users<br /><b>{users.length}</b></div>
          <div className="stat">
            ⚡ Available<br />
            <b>
              {equipment.reduce((a, b) => a + b.availableQuantity, 0)}
            </b>
          </div>
        </div>

      </div>
    </div>
  );
}