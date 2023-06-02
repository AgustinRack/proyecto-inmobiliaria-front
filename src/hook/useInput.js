// import { useState } from "react";

// export default function useInput(val) {
//   const [value, setValue] = useState(val || "");

//   const onChange = (event) => {
//     setValue(event.target.value);
//   };

//   return { onChange, value, setValue };
// }

import { useState } from "react";

export default function useInput(initialValue) {
  const [value, setValue] = useState(initialValue || "");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return { value, onChange: handleChange };
}
