// import logo from './logo.svg';
import './App.css';
import { createBrowserRouter } from 'react-router-dom';
import Main from './components/Main';
import Home from './components/Home';
import EditNote from './components/EditNote';

const App = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/edit/:todo_id',
    element: <EditNote />,
  },
]);

export default App;
