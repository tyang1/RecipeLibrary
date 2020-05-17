import React from "react";
import ReactDOM from "react-dom";
import RecipeMenu from "../components/AppBar.jsx";
import Content from "../components/Content.jsx";

//ContentView components
import MyRecipe from "../components/MyRecipe.jsx";

export default function App() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
    const contentView = {
      0: <MyRecipe/>,
      1: <h2>Hello Recipe Library</h2>,
    };
  return (
    <div>
      <RecipeMenu value={value} handleChange={handleChange} />
      <Content content={contentView[value]}/>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
