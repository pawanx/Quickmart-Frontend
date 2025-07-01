import { useSearchParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query")?.toLowerCase() || "";
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const result = products.filter((prod) =>
      prod.title.toLowerCase().includes(query)
    );
    setFiltered(result);
  }, [query]);

  return (
    <div className="container mt-4">
      <h4>
        Search Results for "{query}" ({filtered.length} items)
      </h4>
      <div className="row mt-3">
        {filtered.map((prod) => (
          <div className="col-md-3 mb-3" key={prod.id}>
            <Link
              to={`/productDetails/${prod.id}`}
              className="text-decoration-none text-dark"
            >
              <div className="card h-100 shadow">
                <img
                  src={prod.image}
                  alt={prod.title}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{prod.title}</h5>
                  <p>₹{prod.price}</p>
                  <p>Rating: {prod.rating}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
        {filtered.length === 0 && <p>No results found.</p>}
      </div>
    </div>
  );
}
