import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import HomePage from "./pages/HomePage";
import IntroPage from "./pages/introPage";
import NewsPage from "@/pages/news/newsPage";
import StockPage from "@/pages/stock/stockPage";
import LoginPage from "@/pages/auth/loginPage";
import SignUpPage from "@/pages/auth/signUpPage";
import MyPage from "@/pages/auth/myPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />
        <main className="pt-16">
          <Routes>
            <Route path="/intro" element={<IntroPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/stock" element={<StockPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/mypage" element={<MyPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
