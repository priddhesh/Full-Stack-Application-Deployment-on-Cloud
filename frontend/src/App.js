import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let result = await fetch("http://localhost:5000/data");
    result = await result.json();
    setData(result);
  };

  const addData = async () => {
    if (newData.length === 0) {
      window.alert("Enter data to add!");
    } else {
      let result = fetch("http://localhost:5000/addData", {
        method: "post",
        body : JSON.stringify({newData}),
        headers : {
          "Content-Type":"application/json"
        }
      });
      document.getElementById("input").value = "";
      setTimeout(() => {
        getData();
      }, 100);
    }
  };

  const deleteData = async (e) => {
    let id = e.currentTarget.id;
    let uniqueID = document.getElementById(`id${id}`).innerText;

    let result = fetch(`http://localhost:5000/deleteData/${uniqueID}`, {
      method: "delete",
    });

    setTimeout(() => {
      getData();
    }, 100);
  };

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Crud Application</h1>
      <form>
        <input id="input"
          onChange={(e) => setNewData(e.target.value)}
          type="text"
          placeholder="Enter text here to add"
        ></input>
        <button
          type="button"
          style={{ margin: "10px" }}
          className="btn btn-success"
          onClick={addData}
        >
          Add
        </button>
      </form>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Data</th>
            <th scope="col">Operation</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index}>
                <td>{++index}</td>
                <td style={{ display: "none" }} id={`id${index}`}>
                  {item.id}
                </td>
                <td id={`data${index}`}>{item.info}</td>
                <td>
                  <button
                    style={{ margin: "10px" }}
                    id={`update${index}`}
                    className="btn btn-warning"
                  >
                    Update
                  </button>
                  <button
                    onClick={deleteData}
                    id={`${index}`}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
                {/* <li><button id={`${index}`} onClick={deleteProduct}>Delete</button>
                <Link to="update">Update</Link>
                </li> */}
              </tr>
            ))
          ) : (
            <p>No data found</p>
          )}
        </tbody>
      </table>
    </>
  );
}

export default App;
