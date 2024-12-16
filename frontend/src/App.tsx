import { Routes, Route } from "react-router";
import { lazy, Suspense, JSX } from "react";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const SignUp = lazy(() => import("./pages/SignUp"));
const SignIn = lazy(() => import("./pages/SignIn"));

interface RouteConfig {
  path: string;
  name: string;
  element: JSX.Element;
  fallback: JSX.Element;
}

const routes: RouteConfig[] = [
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
              {route.element}
            </Suspense>
          }
        />
      ))}
    </Routes>
  );
};

export default App;