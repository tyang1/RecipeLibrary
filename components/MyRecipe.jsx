import React from "react";
import TopItems from "./TopItems.jsx";

export default function MyRecipe() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    console.log(newValue)
    setValue(newValue);
  };
  return (
    <div>
      <TopItems
        value={value}
        selectHandler={handleChange}
        number={3}
        title="Recently Viewed Recipes"
      />
      <TopItems
        value={value}
        selectHandler={handleChange}
        number={3}
        title="Most Popular Recipes"
      />
    </div>
  );
}
