import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import useFetch from "../useFetch";
export const categories = [
  {
    id: "dairy",
    title: "Dairy, Bread and Eggs",
    image:
      "https://images.unsplash.com/photo-1679811999449-2a2902808d65?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // free image
    alt: "assorted dairy products",
    link: "/products/dairy",
  },
  {
    id: "fruitsNveg",
    title: "Fruits and Vegetable",
    image:
      "https://images.unsplash.com/photo-1610348725531-843dff563e2c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "fresh fruits and vegetables",
    link: "/products/fruitsNveg",
  },
  {
    id: "drinks",
    title: "Cold drink and juices",
    image:
      "https://images.unsplash.com/photo-1571114865995-9545aedcd241?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "cold drink",
    link: "/products/drinks",
  },
  {
    id: "cleaning",
    title: "Cleaning Essentials",
    image:
      "https://plus.unsplash.com/premium_photo-1726768966807-330ecbfa087d?q=80&w=719&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "cleaning supplies",
    link: "/products/cleaning",
  },
  {
    id: "chocNice",
    title: "Chocolates and Icecreams",
    image:
      "https://images.unsplash.com/photo-1664945258046-985ed2840a33?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "chocolates and ice cream",
    link: "/products/chocNice",
  },
  {
    id: "stationary",
    title: "Stationary and office supplies",
    image:
      "https://plus.unsplash.com/premium_photo-1664303228218-c7eedbffe762?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Books copies etc",
    link: "/products/stationary",
  },
];

export default function Home() {
  const { data, loading, error } = useFetch(
    "https://quickmart-backend.vercel.app/categories"
  );

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  if (error) return <p>Error: {error}</p>;
  if (!data || !data.categories) return <p>No categories found.</p>;
  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        {/* start of main content */}
        <main className="flex-grow-1">
          <div className="container mt-4">
            <div className="bg-warning py-5 rounded">
              <span className="fs-3 text-success shadow ms-5 ">
                Imported chocolates now available here.
              </span>
              <br />
              <br />
              <Link className="text-decoration-none" to="/products/chocNice">
                <button className="btn btn-success btn-sm ms-5">
                  Shop Now
                </button>
              </Link>
            </div>
          </div>

          <div className="container mt-4">
            <div className="row">
              {data.categories.map((cat) => (
                <div className="col-md-2" key={cat.categoryId}>
                  <Link
                    className="text-decoration-none"
                    to={`/products/${cat.categoryId}`}
                  >
                    <div className="card mb-3 h-100 shadow-sm">
                      <img
                        src={cat.image}
                        alt={cat.id}
                        className="card-img-top"
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{cat.title}</h5>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </main>
        {/* Footer content */}
        <Footer />
      </div>
    </>
  );
}
