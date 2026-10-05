export default function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <span className={`wordmark${light ? " wordmark-light" : ""}`} aria-label="AIVAN STUDIOS">
      <strong>AIVAN</strong>
      <span>STUDIOS</span>
    </span>
  );
}
