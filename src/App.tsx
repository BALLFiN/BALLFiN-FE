import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Home from "./pages/Home";
import Intro from "./pages/intro";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />
        <main className="pt-16">
          <Routes>
            <Route path="/intro" element={<Intro />} />
            <Route path="/" element={<Home />} />
            {/* 다른 라우트들은 나중에 추가 */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
