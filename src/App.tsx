import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import { Layout } from "./components/layout/Layout.tsx";
import Contacts from "./pages/contacts/Contacts.tsx";
import Login from "./pages/login/Login";
import { Medications } from "./pages/medications/Medications.tsx";
import { Therapies } from "./pages/therapies/Therapies.tsx";
import { MedicationDetails } from "./pages/medicationDetails/MedicationDetails.tsx";
import { Profil } from "./pages/profil/Profil.tsx";
import { AddEditTherapie } from "./pages/addEditTherapie/AddEditTherapie.tsx";
import { TherapieDetails } from "./pages/therapieDetails/TherapieDetails.tsx";
import { AddEditContact } from "./pages/addEditContact/AddEditContact.tsx";
import { DoctorDetails } from "./pages/doctorDetails/DoctorDetails.tsx";
import { Program } from "./pages/program/program.tsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    loader: () => redirect("/login"),
  },

  {
    element: <Layout />,
    children: [
      {
        path: "/medications",
        children: [
          {
            path: "",
            element: <Medications />,
          },
          {
            path: "details",
            element: <MedicationDetails />,
          },
        ],
      },

      {
        path: "/contacts",
        children: [
          {
            path: "",
            element: <Contacts />,
          },
          {
            path: "edit",
            element: <AddEditContact />,
          },
          {
            path: "details",
            element: <DoctorDetails />,
          },
        ],
      },

      {
        path: "/therapies",
        children: [
          {
            path: "",
            element: <Therapies />,
          },
          {
            path: "edit",
            children: [
              {
                path: "",
                element: <AddEditTherapie />,
              },
              {
                path: "program",
                element: <Program />,
              },
            ],
          },
          {
            path: "details",
            element: <TherapieDetails />,
          },
        ],
      },
      {
        path: "profil",
        element: <Profil />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
