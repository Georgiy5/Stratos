import { createTheme, virtualColor } from '@mantine/core'

export const theme = createTheme({
    fontFamily:
        'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
    primaryColor: 'primary',
    primaryShade: 6,
    black: '#0b1720',
    white: '#ffffff',
    colors: {
        dark: [
            '#f1f5f9', // 0: Текст
            '#e2e8f0', // 1
            '#cbd5e1', // 2
            '#94a3b8', // 3
            '#64748b', // 4
            '#475569', // 5
            '#212b3b', // 6: Фон карточек (Paper/Card)
            '#151b28', // 7: Фон body
            '#0d121c', // 8
            '#06090e', // 9
        ],
        primary: [
            '#f0fff7',
            '#ddfff0',
            '#c8fbe6',
            '#aef6d3',
            '#84e6b3',
            '#56d48f',
            '#36b66f',
            '#208a52',
            '#116538',
            '#033d1f',
        ],
    },
    fontSizes: { xs: '12px', sm: '14px', md: '16px', lg: '20px', xl: '28px' },
    headings: {
        fontFamily:
            'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
        sizes: {
            h1: { fontSize: '48px', lineHeight: '1.05', fontWeight: '800' },
            h2: { fontSize: '36px', lineHeight: '1.08', fontWeight: '700' },
            h3: { fontSize: '24px', lineHeight: '1.15', fontWeight: '700' },
        },
    },
    radius: { xs: '8px', sm: '12px', md: '16px', lg: '20px', xl: '24px' },
    shadows: {
        xs: '0 2px 6px rgba(2,6,23,0.28)',
        sm: '0 8px 24px rgba(3,8,30,0.36)',
        md: '0 18px 48px rgba(2,8,26,0.5)',
        lg: '0 32px 80px rgba(2,8,26,0.6)',
        xl: '0 48px 120px rgba(2,8,26,0.7)',
    },
    components: {
        Card: {
            defaultProps: {
                radius: 'lg',
                shadow: 'sm',
            },
        },
        Paper: {
            defaultProps: {
                radius: 'lg',
                shadow: 'xs',
            },
        },
        Button: {
            defaultProps: {
                radius: 'xl',
            },
        },
        Modal: {
            defaultProps: {
                overlayOpacity: 0.6,
            },
        },
    },
})
