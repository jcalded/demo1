import { useState } from "react"
import { NavLink } from "react-router"

const HomeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
)

const BoxIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
)

const StoreIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l1-6h16l1 6" />
    <path d="M3 9a2 2 0 0 0 2 2 2 2 0 0 0 2-2 2 2 0 0 0 2 2 2 2 0 0 0 2-2 2 2 0 0 0 2 2 2 2 0 0 0 2-2" />
    <path d="M5 11v9h14v-9" />
    <rect x="9" y="15" width="6" height="5" />
  </svg>
)

const WarehouseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 8.35V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.35A2 2 0 0 1 3.26 6.5l8-3.2a2 2 0 0 1 1.48 0l8 3.2A2 2 0 0 1 22 8.35z" />
    <path d="M6 18h12" />
    <path d="M6 14h12" />
    <rect x="8" y="14" width="8" height="8" />
  </svg>
)

const MenuIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
)

const navItems = [
  { label: "Inicio", to: "/", icon: HomeIcon, exact: true },
  { label: "Productos", to: "/productos", icon: BoxIcon, exact: false },
  { label: "Tiendas", to: "/tiendas", icon: StoreIcon, exact: false },
  { label: "Centros de distribución", to: "/centros", icon: WarehouseIcon, exact: false },
]

const emptySlots = [null, null, null, null]

export default function Sidebar() {
  const [open, setOpen] = useState(true)

  return (
    <>
      {/* Toggle button — floats outside sidebar */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed z-20 flex items-center justify-center w-7 h-7 rounded-lg transition-all duration-300"
        style={{
          top: "14px",
          left: open ? "172px" : "12px",
          backgroundColor: open ? "#2563EB" : "#1E293B",
          color: "#ffffff",
          border: "none",
          transition: "left 0.3s, background-color 0.15s",
          boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
        }}
        title={open ? "Collapse" : "Expand"}
      >
        <MenuIcon />
      </button>

      <aside
        className="flex flex-col h-full shrink-0 transition-all duration-300 overflow-hidden"
        style={{
          width: open ? "200px" : "0px",
          backgroundColor: "#1E293B",
          borderRight: "none",
        }}
      >
        {/* Logo */}
        <div className="px-5 pt-5 pb-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <span className="text-2xl font-bold tracking-tight" style={{ color: "#ffffff", fontFamily: "'Inter', sans-serif" }}>
            Flowi
          </span>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
          {navItems.map(({ label, to, icon: Icon, exact }) => (
            <NavLink
              key={to}
              to={to}
              end={exact}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150"
              style={({ isActive }) => ({
                backgroundColor: isActive ? "#2563EB" : "transparent",
                color: isActive ? "#ffffff" : "rgba(255,255,255,0.65)",
              })}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                if (el.getAttribute("aria-current") !== "page") {
                  el.style.backgroundColor = "rgba(255,255,255,0.08)"
                  el.style.color = "#ffffff"
                }
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                if (el.getAttribute("aria-current") !== "page") {
                  el.style.backgroundColor = "transparent"
                  el.style.color = "rgba(255,255,255,0.65)"
                }
              }}
            >
              <Icon />
              <span className="whitespace-nowrap">{label}</span>
            </NavLink>
          ))}

          {/* Empty slots */}
          <div className="mt-2 flex flex-col gap-1">
            {emptySlots.map((_, i) => (
              <div
                key={i}
                className="h-8 rounded-lg transition-all duration-150"
                style={{ backgroundColor: "transparent" }}
                onMouseEnter={(e) => { ;(e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.05)" }}
                onMouseLeave={(e) => { ;(e.currentTarget as HTMLElement).style.backgroundColor = "transparent" }}
              />
            ))}
          </div>
        </nav>
      </aside>
    </>
  )
}
