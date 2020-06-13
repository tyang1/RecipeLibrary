import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import RecipeMenu from "../components/AppBar.jsx";
import Content from "../components/Content.jsx";
import ResponsiveLayout from "../components/ResponsiveLayout.jsx";
import RecipeTags from "../components/RecipeTags.jsx";
import { store } from "../stores/appStores.js";
import { Provider } from "react-redux";
import { loadRecipes } from "../actions/actionCreators";
//ContentView components
import MyRecipe from "../components/MyRecipe.jsx";

export default function App() {
  useEffect(() => {
    store.dispatch(loadRecipes());
  }, []);
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const contentView = {
    0: <MyRecipe />,
    1: <h2>Hello Recipe Library</h2>,
    2: <RecipeTags />,
  };
  const renderDesktop = () => {
    return (
      <div>
        <RecipeMenu value={value} handleChange={handleChange} />
        <Content content={contentView[value]} />
      </div>
    );
  };
  return (
    <Provider store={store}>
      <ResponsiveLayout
        renderDesktop={renderDesktop}
        breakpoint={false}
        renderMobile={() => null}
      />
    </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
