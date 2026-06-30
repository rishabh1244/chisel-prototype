export default function Navbar() {
  return (
    <nav
      className="
        sticky top-0 z-50
        border-b border-border
        bg-panel/90
        backdrop-blur-md
      "
    >
      <div
        className="
          mx-auto flex h-[65px] max-w-7xl
          items-center justify-between
          px-6
        "
      >
        <div className="flex items-center gap-4">
          <div>
            <h1
              className="
                font-display
                text-2xl
                font-bold
                tracking-wide
                text-ink
              "
            >
              CHISEL
            </h1>

          </div>
        </div>

        {/* Links */}

        <div className="hidden items-center gap-10 md:flex">
          {[
            "Projects",
            "Blueprints",
            "Workers",
            "Issues",
          ].map((item) => (
            <a
              key={item}
              href="#"
              className="
                relative
                font-body
                text-sm
                text-faded
                transition-all
                duration-200
                hover:text-amber
              "
            >
              {item}
            </a>
          ))}
        </div>

        {/* Actions */}

        <div className="flex items-center gap-4">


          <button
            className="
              bg-amber
              px-5 py-2
              font-body
              font-semibold
              text-paper
              transition-all
              duration-200
              hover:bg-copper
              hover:scale-105
            "
          >
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}
