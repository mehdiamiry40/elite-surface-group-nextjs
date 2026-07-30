export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: 24,
        fontFamily: '"PT Sans", Arial, sans-serif',
        textAlign: "center",
      }}
    >
      <div>
        <h1 style={{ margin: "0 0 12px", fontSize: 48 }}>Page not found</h1>
        <p style={{ margin: "0 0 24px", color: "#555" }}>
          The page you requested does not exist.
        </p>
        <a
          href="/"
          style={{
            display: "inline-block",
            padding: "12px 20px",
            background: "#e67332",
            color: "#fff",
            textDecoration: "none",
          }}
        >
          Return home
        </a>
      </div>
    </main>
  );
}
