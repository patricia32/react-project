import { Routes, Route } from 'react-router-dom';
import './App.css';
import MainPage from './pages/MainPage';
import ProductPage from './pages/ProductPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/product/:productId" element={<ProductPage />} />
    </Routes>
  );
}

export default App;
