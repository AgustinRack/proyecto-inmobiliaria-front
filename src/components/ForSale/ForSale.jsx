import React, { useState, useEffect } from "react";
import useInput from "../../hook/useInput";
import { useSelector, useDispatch } from "react-redux";
import * as settings from "../../settings";
import axios from "axios";
import PropertyGrid from "../Property/PropertyGrid";
import { setProperties } from "../../state/properties";

function ForSale() {
  const dispatch = useDispatch();

  async function fetchProperties() {
    try {
      const properties = await axios.get(
        `${settings.axiosURL}/properties/for-sale`
      );
      dispatch(setProperties(properties.data));
    } catch (error) {
      throw Error(error);
    }
  }

  useEffect(() => {
    fetchProperties();
  }, []);

  return <PropertyGrid />;
}

export default ForSale;
