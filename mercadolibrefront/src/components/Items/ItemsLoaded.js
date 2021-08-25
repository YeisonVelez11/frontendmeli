import React from "react";
import "./index.scss";
import Shipping from "../../assets/img/ic_shipping.png";

export const ItemsLoaded = ({ items, props }) => {
  const handleDetailItem = (idItem) => {
    props.history.push(`/item/${idItem}`);
  };

  return (
    <div className="container_fluid">
      {items.map((item) => {
        return (
          <div
            key={item.title}
            className="container_item"
            onClick={() => {
              handleDetailItem(item.id);
            }}
          >
            <div>
              <img src={item.picture} alt={item.title} className="items_picture" />
            </div>
            <div className="item_detail">
              <p className="price">
                {item.price.amount} {item.free_shipping && <img className="shipping" src={Shipping} alt="envio gratis" />}{" "}
              </p>
              <p className="title">{item.title}</p>
              <p className="condition">{item.condition}</p>
            </div>
            <div className="container_address">
              <p className="address">{item.address}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
