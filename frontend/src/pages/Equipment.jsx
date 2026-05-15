import { useEffect, useState } from "react";
import API from "../api/api";

export default function Equipment() {
  const [equipment, setEquipment] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await API.get("/equipment");
    setEquipment(res.data);
  };

  return (
    <div className="page">
      <div className="panel">

        <div className="title">📦 Equipment</div>

        <div className="list">
          {equipment.map((item) => (
            <div className="list-item" key={item._id}>
              <div>
                <div className="item-name">{item.name}</div>
                <div className="item-sub">{item.category}</div>
              </div>

              <div className="badge">
                {item.availableQuantity}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}