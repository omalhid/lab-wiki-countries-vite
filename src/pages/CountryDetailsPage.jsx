import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import axios from "axios";

function CountryDetails() { 
    const [fetching, setFetching] = useState(true);
    const [countries, setCountries] = useState(null);
    const { countryId } = useParams();
    const apiURL = "https://ih-countries-api.herokuapp.com/countries";

    useEffect(() => {
        axios.get(apiURL + `/${countryId}`).then((fetch) => {
            setCountries(fetch.data);
            setFetching(false)
        }).catch((err) => console.log(err))
    }, [countryId]);

    return (
        <div className="container">
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>Country Details</p>
    
          {fetching && <p>Loading...</p>}
    
          {!countries && <p>Country not found!</p>}
    
          {!fetching && countries && (
            <div>
              <img
                src={`https://flagpedia.net/data/flags/icon/72x54/${countries.alpha2Code.toLowerCase()}.png`}
                alt="country flag"
              />
              <h1>{countries.name.common}</h1>
              <br />
              <table className="table">
                <thead></thead>
                <tbody>
                  <tr>
                    <td style={{ width: "30%" }}>Capital</td>
                    <td>{countries.capital}</td>
                  </tr>
                  <tr>
                    <td>Area</td>
                    <td>
                      {countries.area} km
                      <sup>2</sup>
                    </td>
                  </tr>
                  <tr>
                    <td>Borders</td>
                    <td>
                      <ul>
                        {countries.borders.map((border) => {
                          return (
                            <li key={border}>
                              <Link key={border} to={`/${border}`}>
                                {border}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      );
    
}

export default CountryDetails;
