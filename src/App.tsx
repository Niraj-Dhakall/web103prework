import { Navigate, useRoutes } from "react-router-dom";

import ShowCreators from "./pages/ShowCreators.tsx";
import AddCreator from "./pages/AddCreator.tsx";
import EditCreator from "./pages/EditCreator.tsx";
import ViewCreator from "./pages/ViewCreator.tsx";

export default function App() {
  const element = useRoutes([
    { path: "/", element: <ShowCreators /> },
    { path: "/show-creators", element: <ShowCreators /> },
    { path: "/add-creator", element: <AddCreator /> },
    { path: "/edit-creator/:id", element: <EditCreator /> },
    { path: "/view-creator/:id", element: <ViewCreator /> },
    { path: "*", element: <Navigate to="/" replace /> }, 
  ]);

  return <main className="container">{element}</main>;
}
