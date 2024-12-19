import { Suspense } from 'react';
import { Routes, Route } from 'react-router';
import ProtectedRoute from './pages/ProtectedRoute';

import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';

const routes = [
  {
    path: "/",
    name: "dashboard",
    element: <Dashboard />,
    fallback: <div>Loading Dashboard...</div>
  },
  {
    path: "/sign-up",
    name: "sign-up",
    element: <SignUp />,
    fallback: <div>Loading Sign Up...</div>
  },
  {
    path: "/sign-in",
    name: "sign-in",
    element: <SignIn />,
    fallback: <div>Loading Sign In...</div>
  },
];

const App = () => {
  return (
    <Routes>
      {routes.map((route) => (
        <Route
          key={route.name}
          path={route.path}
          element={
            <Suspense fallback={route.fallback}>
              {route.name === 'dashboard' ? (
                <ProtectedRoute element={route.element} />
              ) : (
                route.element
              )}
            </Suspense>
          }
        />
      ))}
    </Routes>
  );
};

export default App;