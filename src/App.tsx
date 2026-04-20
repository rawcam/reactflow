// src/App.tsx
import { useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ReactFlowProvider } from '@xyflow/react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store, RootState } from './store';
import { supabase } from './lib/supabaseClient';
import { setSession, setRole, setLoading } from './store/authSlice';
import { Topbar } from './components/layout/Topbar';
import { DashboardPage } from './pages/DashboardPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { CalculationsPage } from './pages/CalculationsPage';
import { SpecificationsListPage } from './pages/SpecificationsListPage';
import { SpecificationPage } from './pages/SpecificationPage';
import FlowEditorPage from './pages/FlowEditorPage';
import { LoginPage } from './pages/LoginPage';
import './index.css';

const AppContent = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);

  useEffect(() => {
    // Проверяем текущую сессию при загрузке
    supabase.auth.getSession().then(({ data: { session } }) => {
      dispatch(setSession(session));
      if (session?.user) {
        // Загружаем роль пользователя из таблицы user_roles
        supabase
          .from('user_roles')
          .select('role')
          .eq('id', session.user.id)
          .single()
          .then(({ data, error }) => {
            if (!error && data) {
              dispatch(setRole(data.role));
            }
            dispatch(setLoading(false));
          });
      } else {
        dispatch(setLoading(false));
      }
    });

    // Подписываемся на изменения аутентификации
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      dispatch(setSession(session));
      if (session?.user) {
        supabase
          .from('user_roles')
          .select('role')
          .eq('id', session.user.id)
          .single()
          .then(({ data, error }) => {
            if (!error && data) {
              dispatch(setRole(data.role));
            }
          });
      } else {
        dispatch(setRole(null));
      }
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, [dispatch]);

  if (isLoading) {
    return <div className="loading-screen">Загрузка...</div>;
  }

  return (
    <ReactFlowProvider>
      <HashRouter>
        {user ? (
          <div className="app">
            <Topbar />
            <div className="app-layout">
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/projects" element={<ProjectsPage />} />
                  <Route path="/calculations" element={<CalculationsPage />} />
                  <Route path="/specifications" element={<SpecificationsListPage />} />
                  <Route path="/specification/:id" element={<SpecificationPage />} />
                  <Route path="/specification" element={<SpecificationPage />} />
                  <Route path="/flow-editor" element={<FlowEditorPage />} />
                </Routes>
              </main>
            </div>
          </div>
        ) : (
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        )}
      </HashRouter>
    </ReactFlowProvider>
  );
};

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
