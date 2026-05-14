import { Outlet } from 'react-router'
import Header from '../components/Header/Header'
import { Box } from '@mantine/core'
import { FooterCentered } from '../components/Footer/Footer'

export default function Layout() {
    return (
        <>
            <Header />
            <Box mt={72} style={{ flex: 1 }}>
                <Outlet />
            </Box>
            <FooterCentered />
        </>
    )
}
