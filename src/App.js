import { useState } from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';
import './App.scss';
import Header from './components/Header/Header';
import LoginForm from './components/LoginForm/LoginForm';
import UserList from './components/UserList/UserList';

function App() {
  const [sessionToken, setSessionToken] = useState(false);
  return (
    <BrowserRouter>
    <div className="App">
      <Header sessionToken={sessionToken} setSessionToken={setSessionToken} />
        <Route exact path="/">
          <h2 className="App__headline">Тут должен быть очень красивый фон, но лучше перейти к списку пользователей!</h2>
          <NavLink to="/userlist" className="App__listLink">
            К списку пользователей!
          </NavLink>
        </Route>
        <Route path="/login">
          <LoginForm sessionToken={sessionToken} setSessionToken={setSessionToken} />
        </Route>
        <Route path="/userlist">
          <UserList sessionToken={sessionToken} />
        </Route>
    </div>
    </BrowserRouter>
  );
}

export default App;
