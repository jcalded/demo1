import { useEffect, useState } from "react"
import { EmptyState, Field, FormPanel, Header, Toast, type View } from "../components/SharedUI"
import { createDistributionCenter, getDistributionCenters } from "../services/distributionCenterService"

interface DistributionCenter { id: number; code: string; name: string; address: string; city: string }
const emptyForm = { code: "", name: "", address: "", city: "" }
function errorMessage(error: any) { return error.response?.data?.message ?? "No se pudo conectar con el backend." }

export default function CentrosDistribucion() {
  const [view, setView] = useState<View>("list")
  const [centers, setCenters] = useState<DistributionCenter[]>([])
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState<Record<string, boolean>>({})
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" | "warning" } | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const showToast = (msg: string, type: "success" | "error" | "warning") => { setToast({ msg, type }); setTimeout(() => setToast(null), 3000) }
  const loadCenters = async () => { setLoading(true); try { const response = await getDistributionCenters(); setCenters(Array.isArray(response.data) ? response.data : []) } catch (error) { showToast(errorMessage(error), "error") } finally { setLoading(false) } }
  useEffect(() => { void loadCenters() }, [])
  const handleSubmit = async () => {
    const nextErrors: Record<string, boolean> = {}
    Object.keys(form).forEach((key) => { if (!form[key as keyof typeof form].trim()) nextErrors[key] = true })
    if (Object.keys(nextErrors).length) { setErrors(nextErrors); showToast("Completa los campos requeridos.", "error"); return }
    setSaving(true)
    try { await createDistributionCenter(form); setForm(emptyForm); setErrors({}); setView("list"); showToast("Centro de distribución registrado exitosamente.", "success"); await loadCenters() }
    catch (error: any) { showToast(error.response?.status === 409 ? "Ya existe un centro con ese código." : errorMessage(error), error.response?.status === 409 ? "warning" : "error") }
    finally { setSaving(false) }
  }
  const f = (key: keyof typeof form) => ({ value: form[key], onChange: (value: string) => { setForm({ ...form, [key]: value }); setErrors({ ...errors, [key]: false }) } })
  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: "#f5f0e8" }}>
      {toast && <Toast message={toast.msg} type={toast.type} />}
      <Header title="Centros de distribución" subtitle={`${centers.length} centros registrados`} view={view} onToggle={() => setView(view === "list" ? "register" : "list")} />
      {view === "list" ? loading ? <p className="p-8 text-sm" style={{ color: "#8a7a60" }}>Cargando centros de distribución...</p> : centers.length === 0 ? <EmptyState icon="⬡" title="No hay centros de distribución disponibles" subtitle="Registra el primer centro de la red logística." onAction={() => setView("register")} actionLabel="Registrar centro" /> :
        <div className="overflow-auto"><table className="w-full text-sm border-collapse"><thead><tr className="border-b" style={{ borderColor: "#d4c9b0" }}>{["ID", "Nombre", "Código", "Dirección", "Ciudad"].map((heading) => <th key={heading} className="text-left text-[10px] font-semibold tracking-widest uppercase px-6 py-3" style={{ color: "#8a7a60" }}>{heading}</th>)}</tr></thead><tbody>{centers.map((center, index) => <tr key={center.id} className="border-b" style={{ borderColor: "#d4c9b0", backgroundColor: index % 2 === 0 ? "transparent" : "#ede8df" }}><td className="px-6 py-3 text-xs" style={{ color: "#5a4a30" }}>{center.id}</td><td className="px-6 py-3 font-semibold" style={{ color: "#3d2e14" }}>{center.name}</td><td className="px-6 py-3 text-xs" style={{ color: "#8a7a60" }}>{center.code}</td><td className="px-6 py-3" style={{ color: "#6b5a3e" }}>{center.address}</td><td className="px-6 py-3" style={{ color: "#3d2e14" }}>{center.city}</td></tr>)}</tbody></table></div> :
        <FormPanel title="Nuevo centro de distribución" onCancel={() => setView("list")} onSubmit={handleSubmit} loading={saving}><div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(["code", "name", "address", "city"] as const).map((key) => <div key={key}><Field label={{ code: "Código del centro", name: "Nombre", address: "Dirección", city: "Ciudad" }[key]} placeholder={`Ingresa ${key === "code" ? "el código" : key === "name" ? "el nombre" : key === "address" ? "la dirección" : "la ciudad"}`} required {...f(key)} />{errors[key] && <p className="text-[10px] mt-1" style={{ color: "#7a3a3a" }}>Campo requerido</p>}</div>)}
        </div></FormPanel>}
    </div>
  )
}
