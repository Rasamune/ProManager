import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import MainContainer from './components/MainContainer';
import MainView from './components/MainView';

function App() {
  return (
    <>
      <Header />
      <MainContainer>
        <Routes>
          <Route path="/*" element={<MainView />} />

          {/* Redirects */}
          <Route path="/project" element={<Navigate replace to="/" />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </MainContainer>
    </>
  );
}

export default App;
