import "./StateStyles.css";

function OfflinePage() {
  return (
    <div className="state-shell">
      <div className="state-card">
        <div className="state-icon">📡</div>
        <h2>You are offline</h2>
        <p>Please reconnect to the internet and try again.</p>
      </div>
    </div>
  );
}

export default OfflinePage;
