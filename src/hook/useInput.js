import { useState } from "react";

export default function useInput(val) {
  const [value, setValue] = useState(val || "");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return { onChange, value, setValue };
}
