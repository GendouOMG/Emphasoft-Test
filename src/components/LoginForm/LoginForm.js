import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './LoginForm.scss'

function LoginForm({ sessionToken, setSessionToken }) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  function changeUsername(event) {
    setUsername(event.target.value);
  }

  function changePassword(event) {
    setPassword(event.target.value);
  }

  function getToken(event) {
    setLoading(true);

    event.preventDefault();
    fetch(`http://emphasoft-test-assignment.herokuapp.com/api-token-auth/`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "username": username,
        "password": password
      })
    })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw response;
        }
      })
      .then(data => {
        setSessionToken(data.token);
        setLoading(false);
      })
      .catch(response => {
        response.json().then(error => {
          setLoading(false);
          errorProcessing(error);
        });
      });
  }

  function errorProcessing(error) {
    let finalMessage = "";

    for (let key in error) {
      finalMessage = finalMessage + key + ": " + error[key] + "\n";
    }

    alert("Неверный логин или пароль! \n" + finalMessage);
  }

  if(sessionToken !== false) {
    return (
      <div className="LoginForm">
        <h3 className="LoginForm__headline">Добро пожаловать!</h3>
        <NavLink to="/userlist" className="LoginForm__listLink">
          К списку пользователей!
        </NavLink>
        <button
          className="LoginForm__signInBtn"
          onClick={()=>setSessionToken(false)}>
            Выйти
        </button>
      </div>
    );
  }
  return (
    <form className="LoginForm" onSubmit={getToken}>
      <h3 className="LoginForm__headline">Войти</h3>
      <input
        className="LoginForm__inputField"
        onChange={changeUsername}
        type="text"
        value={username}
        name="Username"
        placeholder="Username">
      </input>

      <input
        className="LoginForm__inputField"
        onChange={changePassword}
        type="password"
        value={password}
        name="Password"
        placeholder="Password">
      </input>
      <button
        disabled={loading || password.length === 0 || username.length === 0}
        className="LoginForm__signInBtn LoginForm__signInBtn--green"
        type="submit">
          Войти
      </button>
    </form>
  );
}


export default LoginForm;