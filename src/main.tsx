import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Router } from './Router.tsx'
import '@mantine/core/styles.css'
import { MantineProvider } from '@mantine/core'
import { theme } from './theme.ts'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <MantineProvider theme={theme}>
            <Router />
        </MantineProvider>
    </StrictMode>,
)
