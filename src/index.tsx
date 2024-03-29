import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './styles.css';

import { App } from './pages/App';
import { ListsViewPage } from './pages/ListsViewPage';
import { ItemsPage } from './pages/ItemsPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <ListsViewPage />,
      },
      {
        path: '/:seznam',
        element: <ItemsPage />,
      },
    ],
  },
]);

const appElement = document.querySelector('#app');
if (appElement) {
  createRoot(appElement).render(<RouterProvider router={router} />);
}
