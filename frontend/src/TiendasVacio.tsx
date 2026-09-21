import { useNavigate } from "react-router"

export default function TiendasVacio() {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: "#f5f0e8" }}>
      <header
        className="flex items-center justify-between px-8 py-5 border-b"
        style={{ borderColor: "#d4c9b0" }}
      >
        <h1 className="text-xl font-semibold" style={{ color: "#3d2e14" }}>
          Tiendas
        </h1>
        <button
          className="px-4 py-2 text-sm font-medium rounded transition-all duration-150"
          style={{ backgroundColor: "#e8e0d0", color: "#5a4a30", border: "1px solid #d4c9b0" }}
          onMouseEnter={(e) => {
            ;(e.currentTarget as HTMLElement).style.backgroundColor = "#ddd4c0"
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLElement).style.backgroundColor = "#e8e0d0"
          }}
        >
          Buscar tienda
        </button>
      </header>

      <div className="flex flex-1 flex-col items-center justify-center gap-2">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-1 text-sm transition-all duration-150"
          style={{ color: "#8a7a60" }}
          onMouseEnter={(e) => { ;(e.currentTarget as HTMLElement).style.color = "#3d2e14" }}
          onMouseLeave={(e) => { ;(e.currentTarget as HTMLElement).style.color = "#8a7a60" }}
        >
          ← Regresar
        </button>
        <p className="text-base font-semibold" style={{ color: "#3d2e14" }}>
          No hay tiendas disponibles
        </p>
        <p className="text-sm" style={{ color: "#8a7a60" }}>
          Aún no hay tiendas registradas en el sistema.
        </p>
      </div>
    </div>
  )
}
