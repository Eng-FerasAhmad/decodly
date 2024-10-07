import Base64Decoder from "./Base64Deocder.tsx";

function App() {
  return (
      <div>
          <Base64Decoder/>
          <div className="footer">
              &copy; {new Date().getFullYear()} Feras Ahmad
          </div>
      </div>
  )
}

export default App
