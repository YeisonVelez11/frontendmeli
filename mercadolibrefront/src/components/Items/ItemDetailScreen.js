import React from "react";
import { SearchBarScreen } from "../Search/SearchBarScreen";
import "./index.scss";
import { useFetch } from "../../hooks/useFetch";
import { WEBSERVICE } from "../../config/webservices";
import { Loading } from "../utils_components/loading/Loading";
import { Breadcrums } from "../utils_components/breadcrumb/Breadcrums";

export const ItemDetailScreen = (props) => {
  //Fedding item detal with item details, description and categorys
  const { loading, data } = useFetch(
    `${WEBSERVICE.GET_ITEM_ID}${props.match.params.id}`,
  );
  return (
    <>
      <SearchBarScreen props={props} />
      {loading ? <Loading /> : ""}
      {data && data.item_breadcrumb ? (
        <>
          <Breadcrums categories={data.item_breadcrumb} />
          <div className="container_fluid">
            <div className="container_detail">
              <div className="container_picture">
                <img src={data.item_detail.picture} alt={data.item_detail.item.title} className="picture_detail" />
              </div>
              <div className="details_item">
                <p className="item_detail_condition">
                  {data.item_detail.condition} - {data.item_detail.sold_quantity} vendidos{" "}
                </p>
                <p className="title_detail">{data.item_detail.item.title}</p>
                <p className="price_detail">{data.item_detail.price.amount}</p>
                <button className="button_primary btn_buy">Comprar</button>
              </div>
            </div>
            <div className="container_description">
              <h4 className="title_description">Descripción del Producto</h4>
              <p className="detail_description">{data.item_description}</p>
            </div>
          </div>
        </>
      ) : (
        <p className="no_results">No hay resultados para mostrar</p>
      )}
    </>
  );
};
/*: { item_detail = false, item_description = false, item_breadcrumb = false */
