import Navbar from "./components/Navbar";
import UrlForm from "./components/UrlForm";
import Features from "./components/Features";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <main className="page">
      <Navbar />

      <section className="hero">
        <div className="badge">✦ YOUR LINKS, SIMPLIFIED</div>

        <h1>
          Short links.
          <br />
          <span>Big possibilities.</span>
        </h1>

        <p className="subtitle">
          Turn long URLs into short, shareable links in seconds.
          Simple, quick, and easy to use.
        </p>

        <UrlForm />

        <Features />
      </section>

      <Footer />
    </main>
  );
}

export default App;

