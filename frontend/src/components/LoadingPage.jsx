import "./StateStyles.css";

function LoadingPage({ title = "Loading", message = "Please wait while we prepare everything for you." }) {
  return (
    <div className="state-shell">
      <div className="state-card">
        <div className="state-spinner" />
        <h2>{title}</h2>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default LoadingPage;
