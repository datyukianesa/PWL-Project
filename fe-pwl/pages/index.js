import { useEffect, useState } from 'react';
import axios from 'axios';

const Homepage = () => {
  // CRUD OPERATION
  const url = `http://127.0.0.1:8000/api/apasi`;
  const [users, setUsers] = useState([]);
  const [userInsertName, setUserInsertName] = useState('');
  const [userInsertJob, setUserInsertJob] = useState('');
  const [userDelete, setUserDelete] = useState('');

  useEffect(() => {
    axios.get(url).then((res, req) => {
      setUsers(res.data);
    });
  }, []);

  const addUser = () => {
    axios
      .post(`http://127.0.0.1:8000/api/apasi`, {
        name: userInsertName,
        job: userInsertJob,
      })
      .then(() => {
        alert('User Added');
      });
  };

  const deleteUser = () => {
    axios.delete(`http://127.0.0.1:8000/api/apasi/${userDelete}`);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="mt-10">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Job</th>
                <th>Action</th>
                <th>
                  <label
                    for="insert-modal"
                    class="btn btn-primary modal-button"
                  >
                    Add user
                  </label>
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr>
                  <th>{user.id}</th>
                  <td>{user.name}</td>
                  <td>{user.job}</td>
                  <td className="flex gap-2">
                    <button className="btn btn-success btn-sm">edit</button>
                    <label
                      for="delete-modal"
                      className="btn btn-error btn-sm"
                      onClick={() => setUserDelete(user.id)}
                    >
                      delete
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* delete user modal */}
          <input type="checkbox" id="delete-modal" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box">
              <div className="form-control">
                <div className="text-2xl font-bold">Want to delete ??</div>
              </div>
              <div className="modal-action">
                <label
                  for="delete-modal"
                  className="btn btn-error"
                  onClick={() => deleteUser()}
                >
                  Delete
                </label>
                <label for="delete-modal" className="btn">
                  Close
                </label>
              </div>
            </div>
          </div>
          {/* add user modal */}
          <input type="checkbox" id="insert-modal" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box">
              <div className="form-control">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="input input-bordered"
                  onChange={(e) => setUserInsertName(e.target.value)}
                />
              </div>
              <div className="form-control">
                <input
                  type="text"
                  placeholder="Your Job"
                  className="input input-bordered"
                  onChange={(e) => setUserInsertJob(e.target.value)}
                />
              </div>
              <div className="modal-action">
                <label
                  for="insert-modal"
                  className="btn btn-primary"
                  onClick={() => addUser()}
                >
                  Submit
                </label>
                <label for="insert-modal" className="btn">
                  Close
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
