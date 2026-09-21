import { useState } from "react"
import { NavLink } from "react-router"

const slots = [
  { label: "Inicio", to: "/" },
  { label: "Productos", to: "/productos" },
  { label: "Tiendas", to: "/tiendas" },
  { label: "Centros de distribución", to: "/centros" },
  { label: null, to: null },
  { label: null, to: null },
  { label: null, to: null },
  { label: null, to: null },
]

export default function Sidebar() {
  const [open, setOpen] = useState(true)

  return (
    <aside
      className="flex flex-col h-full shrink-0 transition-all duration-300 overflow-hidden"
      style={{
        width: open ? "160px" : "0px",
        backgroundColor: "#e8e0d0",
        borderRight: open ? "1px solid #d4c9b0" : "none",
      }}
    >
      {/* Toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="absolute top-3 left-3 z-10 flex items-center justify-center w-6 h-6 rounded transition-all duration-150 text-xs font-bold"
        style={{
          backgroundColor: "#e8e0d0",
          border: "1px solid #d4c9b0",
          color: "#6b5a3e",
          left: open ? "136px" : "8px",
          position: "fixed",
          top: "12px",
          transition: "left 0.3s",
        }}
        title={open ? "Replegar" : "Expandir"}
      >
        <span className="flex flex-col gap-0.5">
          <span className="block w-3 h-px" style={{ backgroundColor: "#6b5a3e" }} />
          <span className="block w-3 h-px" style={{ backgroundColor: "#6b5a3e" }} />
          <span className="block w-3 h-px" style={{ backgroundColor: "#6b5a3e" }} />
        </span>
      </button>

      <div className="flex flex-col w-40">
        {slots.map(({ label, to }, i) =>
          to ? (
            <NavLink
              key={i}
              to={to}
              end={to === "/"}
              className="flex items-center justify-center h-16 w-full text-xs font-semibold transition-all duration-150 border-b whitespace-nowrap"
              style={({ isActive }) => ({
                borderColor: "#d4c9b0",
                backgroundColor: isActive ? "#f5f0e8" : "transparent",
                color: isActive ? "#3d2e14" : "#6b5a3e",
              })}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLElement).style.backgroundColor = "#ddd4c0"
              }}
              onMouseLeave={(e) => {
                const isActive = e.currentTarget.getAttribute("aria-current") === "page"
                ;(e.currentTarget as HTMLElement).style.backgroundColor = isActive ? "#f5f0e8" : "transparent"
              }}
            >
              {label}
            </NavLink>
          ) : (
            <div
              key={i}
              className="flex items-center justify-center h-8 w-full transition-all duration-150 border-b cursor-default whitespace-nowrap"
              style={{ borderColor: "#d4c9b0", color: "#6b5a3e" }}
            >
              {label && <span className="text-xs font-medium px-2 text-center leading-tight">{label}</span>}
            </div>
          )
        )}
      </div>
    </aside>
  )
}
