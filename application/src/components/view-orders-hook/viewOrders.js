import React, { useState, useEffect } from "react";
import { Template } from "../../components";
import { SERVER_IP } from "../../private";
import OrdersList from "./ordersList";
import "./viewOrders.css";

export default function ViewOrders(props) {
  const [orders, setOrders] = useState([]);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    fetch(`${SERVER_IP}/api/current-orders`)
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          setOrders(response.orders);
        } else {
          console.log("Error getting orders");
        }
      });
    setRefresh(false);
  }, [refresh]);

  return (
    <Template>
      <div className="container-fluid">
        {orders.length === 0 ? (
          <div className="empty-orders">
            <h2>There are no orders to display</h2>
          </div>
        ) : (
          <>
            {orders.map((order) => (
              <OrdersList
                order={order}
                key={order._id}
                setRefresh={setRefresh}
              />
            ))}
          </>
        )}
      </div>
    </Template>
  );
}
