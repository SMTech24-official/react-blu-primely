/* eslint-disable @typescript-eslint/no-explicit-any */
import { Route, Routes } from 'react-router-dom';
import { routes } from './routes/Routes';

const App = () => {
  const renderRoutes = (routes: any) => {
    return routes.map((route: any, index: number) => {
      if (route.children) {
        return (
          <Route path={route.path} element={route.element} key={index}>
            {renderRoutes(route.children)}
          </Route>
        );
      }

      return <Route path={route.path} element={route.element} key={index} />;
    });
  };

  return (
    <Routes >
      {renderRoutes(routes)}
    </Routes>
  );
};

export default App;
