import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Home';
import SearchComponent from './components/Search/Search';
import SortComponent from './components/Sort/Sort';

// Main App
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchComponent />} />
          <Route path="/sort" element={<SortComponent />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
