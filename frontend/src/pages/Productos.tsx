import { useEffect, useState } from "react"
import { Field, EmptyState, Toast, Header, FormPanel, type View } from "../components/SharedUI"
import { createProduct, getProducts } from "../services/productService"

interface Product {
  id: number
  code: string
  name: string
  description: string
  price: number
}

const emptyForm = { code: "", name: "", description: "", price: "" }

function errorMessage(error: any) {
  return error.response?.data?.message ?? "No se pudo conectar con el backend."
}

export default function Productos() {
  const [view, setView] = useState<View>("list")
  const [products, setProducts] = useState<Product[]>([])
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" | "warning" } | null>(null)
  const [errors, setErrors] = useState<Record<string, boolean>>({})
  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const showToast = (msg: string, type: "success" | "error" | "warning") => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const loadProducts = async () => {
    setLoading(true)
    try {
      const response = await getProducts()
      setProducts(Array.isArray(response.data) ? response.data : [])
    } catch (error) {
      showToast(errorMessage(error), "error")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { void loadProducts() }, [])

  const handleSubmit = async () => {
    const required = ["code", "name", "description", "price"]
    const nextErrors: Record<string, boolean> = {}
    required.forEach((key) => { if (!form[key as keyof typeof form].trim()) nextErrors[key] = true })
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      showToast("Completa los campos requeridos.", "error")
      return
    }
    setSaving(true)
    try {
      await createProduct({ ...form, price: Number(form.price) })
      setForm(emptyForm)
      setErrors({})
      setView("list")
      showToast("Producto registrado exitosamente.", "success")
      await loadProducts()
    } catch (error: any) {
      showToast(error.response?.status === 409 ? "Ya existe un producto con ese código." : errorMessage(error),
        error.response?.status === 409 ? "warning" : "error")
    } finally {
      setSaving(false)
    }
  }

  const f = (key: keyof typeof form) => ({
    value: form[key],
    onChange: (value: string) => {
      setForm({ ...form, [key]: value })
      setErrors({ ...errors, [key]: false })
    },
  })

  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: "#f5f0e8" }}>
      {toast && <Toast message={toast.msg} type={toast.type} />}
      <Header title="Products" subtitle={`${products.length} products registered`} view={view}
        onToggle={() => setView(view === "list" ? "register" : "list")} />
      {view === "list" ? (
        loading ?         <p className="p-8 text-sm" style={{ color: "#8a7a60" }}>Cargando productos...</p> :
        products.length === 0 ? <EmptyState icon="▦" title="No hay productos registrados"
          subtitle="Comienza registrando tu primer producto." onAction={() => setView("register")}
          actionLabel="Registrar producto" /> :
        <div className="overflow-auto"><table className="w-full text-sm border-collapse"><thead><tr className="border-b" style={{ borderColor: "#d4c9b0" }}>
          {["ID", "Nombre", "Código", "Descripción", "Precio"].map((heading) => <th key={heading} className="text-left text-[10px] font-semibold tracking-widest uppercase px-6 py-3" style={{ color: "#8a7a60" }}>{heading}</th>)}
        </tr></thead><tbody>{products.map((product, index) => <tr key={product.id} className="border-b" style={{ borderColor: "#d4c9b0", backgroundColor: index % 2 === 0 ? "transparent" : "#ede8df" }}>
          <td className="px-6 py-3 text-xs" style={{ color: "#5a4a30" }}>{product.id}</td>
          <td className="px-6 py-3 font-semibold" style={{ color: "#3d2e14" }}>{product.name}</td>
          <td className="px-6 py-3 text-xs" style={{ color: "#8a7a60" }}>{product.code}</td>
          <td className="px-6 py-3" style={{ color: "#6b5a3e" }}>{product.description}</td>
          <td className="px-6 py-3 font-semibold" style={{ color: "#3a6b47" }}>${product.price.toLocaleString()}</td>
        </tr>)}</tbody></table></div>
      ) : (
        <FormPanel title="Nuevo producto" onCancel={() => setView("list")} onSubmit={handleSubmit} loading={saving}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><Field label="Código del producto" placeholder="Ej. CAM-001" required {...f("code")} />{errors.code && <p className="text-[10px] mt-1" style={{ color: "#7a3a3a" }}>Campo requerido</p>}</div>
            <div><Field label="Nombre del producto" placeholder="Ej. Camiseta de algodón" required {...f("name")} />{errors.name && <p className="text-[10px] mt-1" style={{ color: "#7a3a3a" }}>Campo requerido</p>}</div>
            <div className="sm:col-span-2"><Field label="Descripción" placeholder="Descripción del producto" required {...f("description")} />{errors.description && <p className="text-[10px] mt-1" style={{ color: "#7a3a3a" }}>Campo requerido</p>}</div>
            <div><Field label="Precio (COP)" type="number" placeholder="0" required {...f("price")} />{errors.price && <p className="text-[10px] mt-1" style={{ color: "#7a3a3a" }}>Campo requerido</p>}</div>
          </div>
        </FormPanel>
      )}
    </div>
  )
}
