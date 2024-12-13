// import dependencies that create the reactDOM and react router; also the style for the site
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

// import the main application, along with the three page components that may be rendered on site
import App from './App.tsx';
import CandidateSearch from './pages/CandidateSearch.tsx';
import SavedCandidates from './pages/SavedCandidates.tsx';
import ErrorPage from './pages/ErrorPage.tsx';

// create router, which is used to determined based on the current URL path which page will be rendered on screen
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <CandidateSearch />,
      },
      {
        path: '/SavedCandidates',
        element: <SavedCandidates />,
      },
    ],
  },
]);

// get the rootElement from index.html to render single-page application
const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}