import './UserUnit.scss';

function UserUnit({ userData }) {
  return (
    <div className="UserUnit">
      <p className="UserUnit__infoItem">ID: {userData.id}</p>
      <p className="UserUnit__infoItem">Username: {userData.username}</p>
    </div>
  );
}

export default UserUnit;