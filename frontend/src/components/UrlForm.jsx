
import { useState } from "react";

function UrlForm() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleShorten = async (e) => {
    e.preventDefault();

    setError("");
    setShortUrl("");

    if (!url.trim()) {
      setError("Please enter a URL.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8001/url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to shorten URL.");
      }

      setShortUrl(`http://localhost:8001/${data.id}`);
    } catch (err) {
      setError(err.message || "Could not connect to the backend.");
    } finally {
      setLoading(false);
    }
  };

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      alert("Short URL copied!");
    } catch {
      setError("Unable to copy. Please copy the URL manually.");
    }
  };

  return (
    <form className="url-form" onSubmit={handleShorten}>
      <label htmlFor="url-input">Paste your long URL below</label>

      <div className="input-row">
        <span className="link-icon">↗</span>

        <input
          id="url-input"
          type="url"
          placeholder="https://example.com/your-long-url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Shorten URL →"}
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {shortUrl && (
        <div className="result">
          <div className="result-text">
            <span>Your shortened link is ready!</span>

            <a href={shortUrl} target="_blank" rel="noreferrer">
              {shortUrl}
            </a>
          </div>

          <button
            className="copy-button"
            type="button"
            onClick={copyUrl}
          >
            Copy link
          </button>
        </div>
      )}
    </form>
  );
}

export default UrlForm;

