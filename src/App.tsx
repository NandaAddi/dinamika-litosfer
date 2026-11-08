import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';

export const App: React.FC = () => {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/modul/:moduleId" element={<MainLayout />} />
        <Route path="/kuis" element={<MainLayout />} />
        {/* Legacy redirect alias */}
        <Route path="/struktur" element={<Navigate to="/modul/struktur" replace />} />
        <Route path="/lempeng" element={<Navigate to="/modul/lempeng" replace />} />
        <Route path="/vulkanisme" element={<Navigate to="/modul/vulkanisme" replace />} />
        <Route path="/endogen" element={<Navigate to="/modul/endogen" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
