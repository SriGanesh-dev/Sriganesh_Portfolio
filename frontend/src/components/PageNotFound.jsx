import "./StateStyles.css";

function PageNotFound() {
  return (
    <div className="state-shell">
      <div className="state-card">
        <div className="state-icon">404</div>
        <h2>Page not found</h2>
        <p>The page you are looking for does not exist or has been moved.</p>
      </div>
    </div>
  );
}

export default PageNotFound;
