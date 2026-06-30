export default function Hero() {
return (
  <section className="flex min-h-[85vh] items-center px-6">
    <div className="mx-auto max-w-7xl text-center">
      <div className="mx-auto max-w-6xl">
        <p className="mb-5 font-mono text-lg uppercase tracking-[0.35em] text-gold">
          Open Source • Construction Tech
        </p>

        <h1 className="mb-8 font-bold leading-tight text-ink">
          <span className="text-[7.5rem] md:text-[9rem]">
            Chisel
          </span>

          <br />

          <span className="text-[2.25rem] text-amber md:text-[2.75rem]">
            Version control for physical infrastructure.
          </span>
        </h1>

        <p className="mx-auto max-w-3xl text-xl leading-relaxed text-muted">
          Track construction progress like software. Raise issues, verify
          work, manage teams, and build a complete history of every change
          made on-site.
        </p>
      </div>
    </div>
  </section>
);
}
