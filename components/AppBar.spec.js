import React from "react";
/**
 * Essentially, this package makes it easy to grab a snapshot of the
 * platform view hierarchy (similar to a DOM tree)
 * rendered by a React DOM or React Native component without using a browser or jsdom.
 *  */
import renderer from "react-test-renderer";
import { mount } from "enzyme";

import AppBar from "./AppBar";

describe("AppBar", () => {
  test("snapshot renders", () => {
    const testRunner = renderer.create(<AppBar />);
    let tree = testRunner.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
