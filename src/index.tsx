import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './styles.css';

import { App } from './pages/App';
import { ListsViewPage } from './pages/ListsViewPage';
import { ItemsPage } from './pages/ItemsPage';

// type CustomRoute = {
//   path: string;
//   element: React.ReactNode;
//   children?: CustomRoute[];
// };

// type CustomRouterConfig = CustomRoute[];

// const routerConfig: CustomRouterConfig = [
//   {
//     path: '/',
//     element: <App />,
//     children: [
//       {
//         path: '/',
//         element: <ListsViewPage />,
//       },
//       {
//         path: '/:seznam',
//         element: <ItemsPage />,
//       },
//     ],
//   },
// ];

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<ListsViewPage />} />
          <Route path=":seznam" element={<ItemsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

const appElement = document.querySelector('#app');
if (appElement) {
  createRoot(appElement).render(<AppRouter />);
}
