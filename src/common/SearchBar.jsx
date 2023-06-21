import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

export default function SearchBar({ setQuery, query }) {
  return (
    <Form className="d-flex">
      <Form.Control
        type="search"
        placeholder="Search"
        className="me-2"
        aria-label="Search"
        value={query}
        onChange={(e) => setQuery(e)}
      />
      <Button variant="outline-success" onClick={handleSearch}>
        Search
      </Button>
    </Form>
  );
}
