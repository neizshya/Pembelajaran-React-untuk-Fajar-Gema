import { useEffect, useState } from "react";
import { API } from "../apis/api";
import { getToken } from "../utils/common";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [profile, setProfile] = useState({});
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const token = getToken();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const getProfile = async () => {
    setIsLoading(true);
    await API.get("api/user", config)
      .then((res) => {
        const response = res.data;
        setProfile(response);
      })
      .catch((err) => {
        console.log("====================================");
        console.log(err);
        console.log("====================================");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const getBook = async () => {
    setIsLoading(true);
    await API.get(`api/books?page=${page}`, config)
      .then((res) => {
        const response = res.data;
        console.log(response);
        setData(response);
      })
      .catch((err) => {
        console.log("====================================");
        console.log(err);
        console.log("====================================");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const handleDelete = (id) => {
    alert(id);
  };
  useEffect(() => {
    getProfile();
    getBook();
  }, []);
  return (
    <>
      {isLoading ? (
        <>
          <h1>Loading Data</h1>
        </>
      ) : (
        <>
          <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
              <a className="navbar-brand" href="#">
                Book
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">
                      Home
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Features
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Pricing
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          <div className="container">
            <div className="row">
              <h1>Selamat datang {profile.name}</h1>
              <button
                onClick={(e) => {
                  navigate("/add");
                }}>
                Add Data
              </button>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">ISBN</th>
                    <th scope="col">Title</th>
                    <th scope="col">Author</th>
                    <th scope="col">Published</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.data?.map((e, i) => (
                    <>
                      <tr>
                        <th scope="row">{i + 1}</th>
                        <td>{e.isbn}</td>
                        <td>{e.title}</td>
                        <td>{e.author}</td>
                        <td>{moment(e.published).format("MMMM DD, YYYY")}</td>
                        <td>
                          <button
                            onClick={() => {
                              handleDelete(e.id);
                            }}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default Home;
