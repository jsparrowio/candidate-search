// import dependencies
import { Outlet } from 'react-router-dom';
import Nav from './components/Nav';

// return entire single-page app, which utilizes react router to determine which page component to render on site
function App() {
  return (
    <>
      <Nav />
      <main>
        <Outlet />
      </main>
    </>
  );
}

// export app to be utilized elsewhere
export default App;
