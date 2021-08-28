import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CaseDetails from "../CaseDetails/CaseDetails";

describe("<CaseDetails />", () => {
  test("it should mount", () => {
    render(<CaseDetails />);

    const caseDetails = screen.getByTestId("CaseDetails");

    expect(caseDetails).toBeInTheDocument();
  });
});
