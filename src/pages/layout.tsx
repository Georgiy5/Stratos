import { Outlet } from 'react-router'
import Header from '../components/Header/Header'

export default function Layout() {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}
