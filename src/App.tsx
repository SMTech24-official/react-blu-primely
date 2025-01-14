/* eslint-disable @typescript-eslint/no-explicit-any */
import { Routes, Route } from 'react-router-dom';
import { routes } from './routes/Routes';



const App = () => {

  const renderRoutes = (routes: any) => {
    return routes.map((route: any, index: number) => {
      // If the route has children, we need to recurse and render the nested routes
      if (route.children) {
        return (
          <Route path={route.path} element={route.element} key={index}>
            {renderRoutes(route.children)}
          </Route>
        );
      }

      // Render the route if no children
      return <Route path={route.path} element={route.element} key={index} />;
    });
  };




  return (
    <Routes>
      {renderRoutes(routes)} {/* Render the dynamic routes */}
    </Routes>
  );
};

export default App;
