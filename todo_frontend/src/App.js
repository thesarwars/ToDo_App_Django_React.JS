// import logo from './logo.svg';
import './App.css';
import { createBrowserRouter } from 'react-router-dom';
import Main from './components/Main';
import Home from './components/Home';

const App = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
  },
  {
    path: '/home',
    element: <Home />,
  },
]);

export default App;
