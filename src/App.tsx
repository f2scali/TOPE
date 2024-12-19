import './App.css';

import { AuthProvider, AppRouter } from './routes/routes';
import { Layout } from './layout/Layout';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import PrivateRoute from './routes/privateRoute';
import { Login } from './pages/Login';
import { ThemeProvider } from './hooks/theme-provider';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route element={<PrivateRoute />}>
              <Route
                path="/*"
                element={
                  <Layout>
                    <AppRouter />
                  </Layout>
                }
              />
            </Route>

            <Route path="*" element={<Navigate to={'/login'} replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
