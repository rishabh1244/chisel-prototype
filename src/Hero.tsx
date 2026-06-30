export default function Hero() {
  return (
    <section className="flex min-h-[85vh] items-center px-6">
      <div className="mx-auto max-w-7xl text-center">
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 font-mono text-gold uppercase tracking-[0.3em] text-accent">
            Open Source • Construction Tech
          </p>

          <h1 className="mb-6 text-6xl font-bold leading-tight text-ink md:text-7xl">
            <span >Chisel</span>
            <br />
            <span className="text-3xl text-amber">
              Version control for physical infrastructure.
            </span>
          </h1>

          <p className="mx-auto text-muted max-w-2xl">
            Track construction progress like software. Raise issues, verify
            work, manage teams, and build a complete history of every change
            made on-site.
          </p>
        </div>
      </div>
    </section>
  );
}
