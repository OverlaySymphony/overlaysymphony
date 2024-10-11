import { render } from "@testing-library/react"

import App from "./App"

describe("App", () => {
  it("works", async () => {
    const { getByTestId } = render(<App name="Yetti" />)

    expect(getByTestId("demo")).toBeInTheDocument()
  })
})
