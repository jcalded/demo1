import { useEffect, useState } from "react"
import { EmptyState, Field, FormPanel, Header, Toast, type View } from "../components/SharedUI"
import { createStore, getStores } from "../services/storeService"

interface Store { id: number; code: string; name: string; address: string; city: string }
const emptyForm = { code: "", name: "", address: "", city: "" }
function errorMessage(error: any) { return error.response?.data?.message ?? "No se pudo conectar con el backend." }

export default function Tiendas() {
  const [view, setView] = useState<View>("list")
  const [stores, setStores] = useState<Store[]>([])
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState<Record<string, boolean>>({})
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" | "warning" } | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const showToast = (msg: string, type: "success" | "error" | "warning") => { setToast({ msg, type }); setTimeout(() => setToast(null), 3000) }
  const loadStores = async () => { setLoading(true); try { const response = await getStores(); setStores(Array.isArray(response.data) ? response.data : []) } catch (error) { showToast(errorMessage(error), "error") } finally { setLoading(false) } }
  useEffect(() => { void loadStores() }, [])
  const handleSubmit = async () => {
    const nextErrors: Record<string, boolean> = {}
    Object.keys(form).forEach((key) => { if (!form[key as keyof typeof form].trim()) nextErrors[key] = true })
    if (Object.keys(nextErrors).length) { setErrors(nextErrors); showToast("Completa los campos requeridos.", "error"); return }
    setSaving(true)
    try { await createStore(form); setForm(emptyForm); setErrors({}); setView("list"); showToast("Tienda registrada exitosamente.", "success"); await loadStores() }
    catch (error: any) { showToast(error.response?.status === 409 ? "Ya existe una tienda con ese código." : errorMessage(error), error.response?.status === 409 ? "warning" : "error") }
    finally { setSaving(false) }
  }
  const f = (key: keyof typeof form) => ({ value: form[key], onChange: (value: string) => { setForm({ ...form, [key]: value }); setErrors({ ...errors, [key]: false }) } })
  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: "#f5f0e8" }}>
      {toast && <Toast message={toast.msg} type={toast.type} />}
      <Header title="Tiendas" subtitle={`${stores.length} tiendas registradas`} view={view} onToggle={() => setView(view === "list" ? "register" : "list")} />
      {view === "list" ? loading ? <p className="p-8 text-sm" style={{ color: "#8a7a60" }}>Cargando tiendas...</p> : stores.length === 0 ? <EmptyState icon="⌂" title="No hay tiendas disponibles" subtitle="Comienza registrando tu primera tienda." onAction={() => setView("register")} actionLabel="Registrar tienda" /> :
        <div className="flex flex-col gap-2 px-8 py-6">{stores.map((store) => <div key={store.id} className="flex items-center justify-between px-5 py-4 rounded" style={{ backgroundColor: "#e8e0d0", border: "1px solid #d4c9b0", color: "#3d2e14" }}><div className="flex flex-col gap-0.5"><span className="text-sm font-semibold">{store.name}</span><span className="text-xs" style={{ color: "#8a7a60" }}>{store.code} · {store.address}, {store.city}</span></div><span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: "#d4edda", color: "#3a6b47" }}>Activa</span></div>)}</div> :
        <FormPanel title="Nueva tienda" onCancel={() => setView("list")} onSubmit={handleSubmit} loading={saving}><div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(["code", "name", "address", "city"] as const).map((key) => <div key={key}><Field label={{ code: "Código de la tienda", name: "Nombre", address: "Dirección", city: "Ciudad" }[key]} placeholder={`Ingresa ${key === "code" ? "el código" : key === "name" ? "el nombre" : key === "address" ? "la dirección" : "la ciudad"}`} required {...f(key)} />{errors[key] && <p className="text-[10px] mt-1" style={{ color: "#7a3a3a" }}>Campo requerido</p>}</div>)}
        </div></FormPanel>}
    </div>
  )
}
