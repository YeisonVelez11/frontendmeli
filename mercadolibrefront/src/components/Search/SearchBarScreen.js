import React, { useEffect } from "react";
import "./index.scss";
import { useForm } from "../../hooks/useForm";
import queryString from "query-string";
import Logo from "../../assets/img/logo.png";
import SearchIcon from "../../assets/img/ic_Search.png";

export const SearchBarScreen = (props) => {
  const [formValues, handleInputChange] = useForm({
    search: "",
  });
  const { search } = formValues;

  useEffect(() => {
    if (props) {
      const param = props.props ? queryString.parse(props.props.location) : queryString.parse(props.location);
      if (param.search) {
        let target = {
          target: {
            name: "search",
            value: param.search.search,
          },
        };
        handleInputChange(target);
      }
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let url = `/items?search=${search}`;
    props.props ? props.props.history.push(url) : props.history.push(url);
  };

  return (
    <>
      <div className="navbar">
        <form onSubmit={handleSubmit} className="container_searchbar">
          <div>
            <img src={Logo} className="nav_logo" alt="logo mercadolibre" />
          </div>
          <div className="container_input_search">
            <input
              type="text"
              name="search"
              className="input_search"
              placeholder="Nunca dejes de buscar"
              autoComplete="off"
              value={search}
              onChange={handleInputChange}
            />
          </div>
          <div className="container_search_icon" onClick={handleSubmit}>
            <img src={SearchIcon} alt="icono búsqueda" />
          </div>
        </form>
      </div>
    </>
  );
};
