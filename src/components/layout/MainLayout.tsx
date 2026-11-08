import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { ReferenceModal } from '../common/ReferenceModal';
import { HomePage } from '../../pages/HomePage';
import { ModulePage } from '../../pages/ModulePage';
import { QuizPage } from '../../pages/QuizPage';

export const MainLayout: React.FC = () => {
  const [isRefsOpen, setIsRefsOpen] = useState(false);
  const location = useLocation();
  const path = location.pathname;

  // Tentukan halaman aktif berdasarkan pathname
  const isHome = path === '/' || path === '';
  const isQuiz = path === '/kuis';
  const isModule = path.startsWith('/modul/') || (!isHome && !isQuiz);

  let activeModuleId = 'struktur';
  if (path.startsWith('/modul/')) {
    const segment = path.split('/')[2];
    if (segment) activeModuleId = segment;
  }

  // Mount ModulePage secara on-demand saat modul pertama kali dibuka
  // Sekali dikunjungi, ModulePage tetap hidup di DOM (keep-alive)
  const [hasVisitedModule, setHasVisitedModule] = useState(isModule);
  React.useEffect(() => {
    if (isModule && !hasVisitedModule) {
      setHasVisitedModule(true);
    }
  }, [isModule, hasVisitedModule]);

  return (
    <div id="app" className={isHome ? 'layout-home' : 'layout-module'}>
      <Header onOpenRefs={() => setIsRefsOpen(true)} />
      <div className="app-body">
        {!isHome && <Sidebar />}
        <main className="main-content">
          <div className="pages">
            <HomePage isActive={isHome} />
            {hasVisitedModule && (
              <ModulePage currentModuleId={activeModuleId} isActive={isModule} />
            )}
            <QuizPage isActive={isQuiz} />
          </div>
        </main>
      </div>
      <ReferenceModal isOpen={isRefsOpen} onClose={() => setIsRefsOpen(false)} />
    </div>
  );
};
