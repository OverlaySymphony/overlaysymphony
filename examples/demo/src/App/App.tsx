export interface AppProps {
  name: string
}

const App: React.FC<AppProps> = ({ name }) => {
  return <div data-testid="demo">Hello, {name}!</div>
}

export default App
