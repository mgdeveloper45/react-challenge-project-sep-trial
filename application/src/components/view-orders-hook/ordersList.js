import React, { useState } from "react";
import { SERVER_IP } from "../../private";
import EditOrders from "../edit-orders/editOrders";

const OrdersList = (props) => {
  const [openEdit, setOpenEdit] = useState(false);
  const { order, setRefresh } = props;

  const deleteOrder = (id) => {
    const DELETE_ORDER_URL = `${SERVER_IP}/api/delete-order`;
    fetch(DELETE_ORDER_URL, {
      method: "POST",
      body: JSON.stringify({
        id: id,
      }),
      headers: {
        "content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => console.log("success", JSON.stringify(res)))
      .catch((error) => console.log(error));
    setRefresh(true);
  };

  const createdDate = new Date(order.createdAt);
  const timeStamp = {
    hour: createdDate.getHours().toString().padStart(2, "0") % 12 || 12,
    min: createdDate.getMinutes().toString().padStart(2, "0"),
    sec: createdDate.getSeconds().toString().padStart(2, "0"),
    amPm: createdDate.getHours() < 12 ? "AM" : "PM",
  };
  return (
    <div className="row view-order-container">
      <div className="col-md-4 view-order-left-col p-3">
        <h2>{order.order_item}</h2>
        <p>Ordered by: {order.ordered_by || ""}</p>
      </div>
      <div className="col-md-4 d-flex view-order-middle-col">
        <p>
          Order placed at{" "}
          {`${timeStamp.hour.toString().padStart(2, "0")}:${timeStamp.min}:${
            timeStamp.sec
          } ${timeStamp.amPm}`}
        </p>
        <p>Quantity: {order.quantity}</p>
      </div>
      <div className="col-md-4 view-order-right-col">
        <button className="btn btn-success" onClick={() => setOpenEdit(true)}>
          Edit
        </button>
        <button
          className="btn btn-danger"
          onClick={() => deleteOrder(order._id)}
        >
          Delete
        </button>
      </div>
      {openEdit && (
        <EditOrders
          id={order._id}
          setOpenEdit={setOpenEdit}
          setRefresh={setRefresh}
        />
      )}
    </div>
  );
};

export default OrdersList;
