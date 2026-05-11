import { createBrowserRouter, RouterProvider } from 'react-router'
import Onboarding from './pages/Onboarding/Onboarding'
import Layout from './pages/layout'

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
                element: <h1>Maps</h1>,
            },
            {
                path: '/models',
                element: <h1>Models</h1>,
            },
        ],
    },
])

export function Router() {
    return <RouterProvider router={router} />
}
