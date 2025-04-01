import React from "react";
import Notes from "./Notes";

const Home = () => {
  return (
    <>
      <div className="container my-3 mb-3">
        <form>
          <div className="my-2">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              <h1>Add Notes</h1>
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="5"
            ></textarea>
          </div>
          <div className="container">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
        <Notes/>
      </div>
    </>
  );
};

export default Home;
