import Wordmark from "@/components/Wordmark";

export default function NotFound() {
  return (
    <main className="not-found-page" id="main-content">
      <section className="not-found-card">
        <Wordmark light />
        <p className="micro-label light-label">ERROR / 404</p>
        <h1>404</h1>
        <h2>Esta ruta no lleva a ningún proyecto.</h2>
        <p>La página que buscas no existe o cambió de dirección.</p>
        <a className="button button-light" href="/">Volver a AIVAN ↗</a>
      </section>
    </main>
  );
}
