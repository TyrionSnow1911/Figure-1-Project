import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Case from "./Case";

describe("<Case />", () => {
  test("it should mount", () => {
    render(<Case />);

    const user = screen.getByTestId("Case");

    expect(user).toBeInTheDocument();
  });
});
