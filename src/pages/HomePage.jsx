import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function HomePage() {
  const [countries, setCountries] = useState([]);
  //   //   const [fetching, setFetching] = useState(true);
  const apiURL = "https://ih-countries-api.herokuapp.com/countries";

  useEffect(() => {
    axios.get(apiURL).then((fetch) => {
      setCountries(fetch.data);
      console.log("data", fetch.data);
      //         // setFetching(false);
    });
  }, []);

  return (
    <div
      className="container"
      style={{ maxHeight: "90vh", overflow: "scroll" }}
    >
      <h1 style={{ fontSize: "24px" }}>
        WikiCountries: Your Guide to the World
      </h1>

      {/* {fetching && (
//         <img
//           src={
//             "https://education-team-2020.s3.eu-west-1.amazonaws.com/web-dev/m3/react-lists/spinner.gif"
//           }
//         />
//       )} */}
      {!countries && <p>Countries not found!</p>}

      {countries && (
        <div className="list-group">
          {countries.map((country) => (
            <Link
              key={country._id}
              className="list-group-item list-group-item-action"
              to={`/${country.alpha3Code}`}
            >
              <img
                src={`https://flagpedia.net/data/flags/icon/72x54/${country.alpha2Code.toLowerCase()}.png`}
                alt="country flag"
              />
              <br />
              {country.name.common}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;
