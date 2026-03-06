import { useState } from 'react';
import Header from './components/layout/Header';
import BottomNav from './components/layout/BottomNav';
import HomePage from './pages/HomePage';
import MapSearchPage from './pages/MapSearchPage';
import LandDetailPage from './pages/LandDetailPage';
import FarmingMatchPage from './pages/FarmingMatchPage';
import MyLandPage from './pages/MyLandPage';
import ConsultPage from './pages/ConsultPage';

export default function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [selectedLand, setSelectedLand] = useState(null);

  const navigate = (tab, land = null) => {
    setCurrentTab(tab);
    if (land) setSelectedLand(land);
  };

  const renderPage = () => {
    switch (currentTab) {
      case 'home':
        return <HomePage onNavigate={navigate} />;
      case 'map':
        return <MapSearchPage onNavigate={navigate} />;
      case 'detail':
        return <LandDetailPage land={selectedLand} onNavigate={navigate} />;
      case 'matching':
        return <FarmingMatchPage />;
      case 'myLand':
        return <MyLandPage onNavigate={navigate} />;
      case 'consult':
        return <ConsultPage />;
      default:
        return <HomePage onNavigate={navigate} />;
    }
  };

  const isMapPage = currentTab === 'map';

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-md relative flex flex-col min-h-screen">
        <Header currentTab={currentTab} />

        <main
          className={`flex-1 overflow-y-auto ${isMapPage ? '' : 'pt-14'} pb-16`}
          style={isMapPage ? { paddingTop: '56px', paddingBottom: '64px' } : {}}
        >
          {isMapPage ? (
            <div className="h-full" style={{ height: 'calc(100vh - 56px - 64px)' }}>
              {renderPage()}
            </div>
          ) : (
            renderPage()
          )}
        </main>

        <BottomNav currentTab={currentTab} onTabChange={setCurrentTab} />
      </div>
    </div>
  );
}
