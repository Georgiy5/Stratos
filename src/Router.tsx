import { createBrowserRouter, RouterProvider } from 'react-router'
import Onboarding from './pages/Onboarding/Onboarding'
import Layout from './pages/layout'
import Maps from './pages/Maps/Maps'
import Models from './pages/Models/Models'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Onboarding />,
            },
            {
                path: '/maps',
                element: <Maps />,
            },
            {
                path: '/models',
                element: <Models />,
            },
        ],
    },
])

export function Router() {
    return <RouterProvider router={router} />
}
