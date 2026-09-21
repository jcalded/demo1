import { Link } from "react-router"

export default function Tiendas() {
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
          onMouseEnter={(e) => { ;(e.currentTarget as HTMLElement).style.backgroundColor = "#ddd4c0" }}
          onMouseLeave={(e) => { ;(e.currentTarget as HTMLElement).style.backgroundColor = "#e8e0d0" }}
        >
          Buscar tienda
        </button>
      </header>

      <div className="flex flex-col gap-2 px-8 py-6">
        {[
          { nombre: "Tienda Medellín Poblado", ubicacion: "Medellín, Antioquia", estado: "Activa" },
          { nombre: "Tienda Rionegro", ubicacion: "Rionegro, Antioquia", estado: "Activa" },
          { nombre: "Tienda El Carmen de Viboral", ubicacion: "El Carmen, Antioquia", estado: "Inactiva" },
        ].map(({ nombre, ubicacion, estado }) => (
          <button
            key={nombre}
            className="flex items-center justify-between px-5 py-4 rounded text-left transition-all duration-150"
            style={{ backgroundColor: "#e8e0d0", border: "1px solid #d4c9b0", color: "#3d2e14" }}
            onMouseEnter={(e) => { ;(e.currentTarget as HTMLElement).style.backgroundColor = "#ddd4c0" }}
            onMouseLeave={(e) => { ;(e.currentTarget as HTMLElement).style.backgroundColor = "#e8e0d0" }}
          >
            <div className="flex flex-col items-start gap-0.5">
              <span className="text-sm font-semibold">{nombre}</span>
              <span className="text-xs" style={{ color: "#8a7a60" }}>{ubicacion}</span>
            </div>
            <span
              className="text-xs font-medium px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: estado === "Activa" ? "#d4edda" : "#f5d4d4",
                color: estado === "Activa" ? "#3a6b47" : "#7a3a3a",
              }}
            >
              {estado}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-auto px-8 py-6 border-t" style={{ borderColor: "#d4c9b0" }}>
        <Link
          to="/tiendas/vacio"
          className="text-sm transition-all duration-150"
          style={{ color: "#8a7a60" }}
          onMouseEnter={(e) => { ;(e.currentTarget as HTMLElement).style.color = "#3d2e14" }}
          onMouseLeave={(e) => { ;(e.currentTarget as HTMLElement).style.color = "#8a7a60" }}
        >
          Ver vista sin tiendas disponibles →
        </Link>
      </div>
    </div>
  )
}
