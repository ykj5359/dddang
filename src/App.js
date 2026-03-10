import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LandDetail from './pages/LandDetail';
import LandTypeHome from './pages/LandTypeHome';
import LandTypeList from './pages/LandTypeList';
import LoanCalculator from './pages/LoanCalculator';
import LoanResult from './pages/LoanResult';
import Consultation from './pages/Consultation';
import Login from './pages/Login';
import Register from './pages/Register';
import RegisterComplete from './pages/RegisterComplete';
import MyPage from './pages/MyPage';
import DirectTrade from './pages/DirectTrade';
import Auction from './pages/Auction';
import Statistics from './pages/Statistics';
import AlertSettings from './pages/AlertSettings';
import FarmlandConsult from './pages/FarmlandConsult';
import FarmlandMatching from './pages/FarmlandMatching';
import MyLand from './pages/MyLand';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/land/:id" element={<LandDetail />} />
        <Route path="/land-type" element={<LandTypeList />} />
        <Route path="/land-type/:type" element={<LandTypeList />} />
        <Route path="/land-category" element={<LandTypeHome />} />
        <Route path="/loan" element={<LoanCalculator />} />
        <Route path="/loan/result" element={<LoanResult />} />
        <Route path="/consultation" element={<Consultation />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/complete" element={<RegisterComplete />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/direct-trade" element={<DirectTrade />} />
        <Route path="/auction" element={<Auction />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/alert-settings" element={<AlertSettings />} />
        <Route path="/farmland-consult" element={<FarmlandConsult />} />
        <Route path="/farmland-matching" element={<FarmlandMatching />} />
        <Route path="/my-land" element={<MyLand />} />
      </Routes>
    </Router>
  );
}

export default App;
