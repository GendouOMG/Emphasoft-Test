import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import UserUnit from '../UserUnit/UserUnit';
import './UserList.scss';

function UserList({ sessionToken }) {

  const [userList, setUserList] = useState([]);
  const [reverseSortOrder, setReverseSortOrder] = useState(false);
  const [reqUsername, setReqUsername] = useState('');
  const [loading, setLoading] = useState(false);

  function getUserList() {
    setLoading(true);

    fetch(`http://emphasoft-test-assignment.herokuapp.com/api/v1/users/`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Token " + sessionToken,
      }
    })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw response;
        }
      })
      .then(data => {
        setUserList(data);
        setLoading(false);
      })
      .catch(response => {
        response.json().then(error => {
          setLoading(false);
        });
      });
  }

  function sortFn(arr = [], field, reverse = false) {
    if(!reverse) {
      return [...arr].sort((a, b) => a[field] > b[field] ? 1 : -1);
    } else {
      return [...arr].sort((a, b) => a[field] > b[field] ? -1 : 1);
    }
  }

  function changeReqUsername(event) {
    setReqUsername(event.target.value);
  }

  useEffect(() => {
    getUserList();
    // eslint-disable-next-line
  }, []);

  if(sessionToken === false) {
    return (
      <div className="UserList">
        <h3 className="UserList__header">Необходимо авторизоваться для просмотра списка!</h3>
        <NavLink className="UserList__refreshBtn" to="/login">
          Авторизоваться
        </NavLink>
      </div>
    );
  }

  return (
    <div className="UserList">
      <div className="UserList__controlWrapper">
        <button
          className="UserList__refreshBtn"
          disabled={loading}
          onClick={getUserList}>
            Обновить список
        </button>

        <button
          className="UserList__sortOrderBtn"
          onClick={() => setReverseSortOrder(prev => !prev)}>
            {reverseSortOrder ? "По убыванию ID" : "По возрастанию ID"}
        </button>

        <input
          className="UserList__filterInput"
          onChange={changeReqUsername}
          type='text'
          value={reqUsername}
          placeholder="Username">
        </input>
      </div>

      {sortFn(userList, "id", reverseSortOrder)
        .filter(user => user.username.toLowerCase().includes(reqUsername.toLowerCase()))
        .map( user => <UserUnit key={user.id} userData={user} />)}
        
    </div>
  );
}

export default UserList;