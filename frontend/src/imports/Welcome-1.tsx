import { useNavigate } from "react-router"

export default function Welcome() {
  const navigate = useNavigate()

  const buttons = [
    { label: "Tabla de productos", to: "/productos" },
    { label: "Tiendas", to: "/tiendas" },
    { label: "Centros de distribución", to: "/centros" },
  ]

  return (
    <div className="flex flex-col h-full items-center justify-center gap-8">
      <h1 className="text-2xl font-semibold text-center px-8" style={{ color: "#5a4a30" }}>
        Sistema de Optimización de Cadena de Suministro tipo Zara
      </h1>
      <div className="flex gap-4 flex-wrap justify-center">
        {buttons.map(({ label, to }) => (
          <button
            key={to}
            onClick={() => navigate(to)}
            className="px-6 py-3 text-sm font-semibold rounded transition-all duration-150"
            style={{ backgroundColor: "#e8e0d0", color: "#3d2e14", border: "1px solid #d4c9b0" }}
            onMouseEnter={(e) => { ;(e.currentTarget as HTMLElement).style.backgroundColor = "#ddd4c0" }}
            onMouseLeave={(e) => { ;(e.currentTarget as HTMLElement).style.backgroundColor = "#e8e0d0" }}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
