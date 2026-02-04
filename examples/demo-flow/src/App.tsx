import "@overlaysymphony/flow/modules"
import Viewer from "@overlaysymphony/flow/viewer"

import graph from "./graphs/hi"

const App: React.FC = () => {
  return (
    <>
      <Viewer graph={graph} />
    </>
  )
}

export default App
