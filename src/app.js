import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import RecipeMenu from "../components/AppBar.jsx";
import Content from "../components/Content.jsx";
import ResponsiveLayout from "../components/ResponsiveLayout.jsx";
import RecipeTags from "../components/RecipeTags.jsx";
import { Provider } from "react-redux";
import { loadRecipes } from "../actions/user/api";
import { initRecipeApp, setAuth } from "../actions/auth/api";
import { configureStore } from "../stores/configureStore";
//ContentView components
import MyRecipe from "../components/MyRecipe.jsx";

export const store = configureStore();

export default function App() {
  useEffect(async () => {
    await initRecipeApp(store);
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
    <>
      <ResponsiveLayout
        renderDesktop={renderDesktop}
        renderMobile={() => null}
        breakpoint={false}
      />
    </>
  );
}

function renderApp() {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );
}

//NOTE: module.hot.accept(param1: module to be hot reloaded, param2: what needs to happen)
if (process.env.NODE_ENV !== "production" && module.hot) {
  module.hot.accept("../components/ResponsiveLayout", renderApp);
}

renderApp();
