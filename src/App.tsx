import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import HomePage from "./pages/HomePage";
import IntroPage from "./pages/introPage";
import NewsPage from "@/pages/news/newsPage";
import StockPage from "@/pages/stock/stockPage";
import StockDetailPage from "@/pages/stock/StockDetailPage";
import LoginPage from "@/pages/auth/loginPage";
import SignUpPage from "@/pages/auth/signUpPage";
import MyPage from "@/pages/auth/myPage";
const queryClient = new QueryClient();
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TransactionPage from "@/pages/transaction/TransactionPage";
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-white">
          <Header />
          <main className="pt-16">
            <Routes>
              <Route path="/intro" element={<IntroPage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/stock" element={<StockPage />} />
              <Route path="/stock/:code" element={<StockDetailPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/transaction" element={<TransactionPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
