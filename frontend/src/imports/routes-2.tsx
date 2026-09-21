import { createBrowserRouter } from "react-router"
import Layout from "./Layout"
import Welcome from "./Welcome"
import Tiendas from "./Tiendas"
import TiendasVacio from "./TiendasVacio"

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Welcome },
      { path: "tiendas", Component: Tiendas },
      { path: "tiendas/vacio", Component: TiendasVacio },
    ],
  },
])
