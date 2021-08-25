import { useState, useEffect, useRef } from "react";
import { AUTHOR } from "../config/constants"
export const useFetch = (url) => {
  const isMounted = useRef(true);
  const [state, setState] = useState({ data: null, loading: true, error: null });

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    setState({ data: null, loading: true, error: null });

    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        author_name: AUTHOR.author_name,
        author_lastname: AUTHOR.author_lastname,
        "Content-type": "application/json; charset=utf-8",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (isMounted.current) {
          setState({
            loading: false,
            error: null,
            data,
          });
        }
      });
  }, [url]);

  return state;
};
