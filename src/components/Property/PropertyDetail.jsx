import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export const PropertyDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const property = useSelector((state) => state.properties.property);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return;
};
