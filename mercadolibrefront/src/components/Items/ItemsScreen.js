import React from "react";
import { SearchBarScreen } from "../Search/SearchBarScreen";
import "./index.scss";
import { useFetch } from "../../hooks/useFetch";
import { WEBSERVICE } from "../../config/webservices";
import { Breadcrums } from "../utils_components/breadcrumb/Breadcrums";
import queryString from "query-string";
import { ItemsLoaded } from "./ItemsLoaded";
import { Loading } from "../utils_components/loading/Loading";
export const ItemsScreen = (props) => {
  const param = queryString.parse(props.location.search);
  const { loading, data } = useFetch(`${WEBSERVICE.GET_ITEMS}?q=${param.search}`);
  return (
    <>
      <SearchBarScreen props={props} />
      {loading ? <Loading /> : ""}
      {data && data.data ? (
        <>
          <Breadcrums categories={data.data.categories} search={param.search} />
          <ItemsLoaded items={data.data.items} props={props} />
        </>
      ) : (
        <p className="no_results">No hay resultados para mostrar</p>
      )}
    </>
  );
};
