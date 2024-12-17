import { useSelector } from 'react-redux';
import './App.css';
import { RootState } from './redux/store/store';

import { AuthProvider, AppRouter } from './routes/routes';
import { Layout } from './layout/Layout';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import PrivateRoute from './routes/privateRoute';
import { Login } from './pages/Login';

function App() {
  return (
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
  );
}

export default App;
