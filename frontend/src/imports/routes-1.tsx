import { createBrowserRouter } from "react-router"
import Layout from "./Layout"
import Welcome from "./pages/Welcome"
import Productos from "./pages/Productos"
import Tiendas from "./pages/Tiendas"
import CentrosDistribucion from "./pages/CentrosDistribucion"
import TiendasVacio from "./pages/TiendasVacio"

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Welcome },
      { path: "productos", Component: Productos },
      { path: "tiendas", Component: Tiendas },
      { path: "tiendas/vacio", Component: TiendasVacio },
      { path: "centros", Component: CentrosDistribucion },
    ],
  },
])
