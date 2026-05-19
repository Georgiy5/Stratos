import { Box, Paper, useMantineColorScheme } from '@mantine/core'
import Legend from '../Legend/Legend'

export type LegendItem = {
    label: string
    color: string
}

type LegendOverlayProps = {
    items: LegendItem[]
    isCompact?: boolean
    maxWidth?: number | string
    compactMaxWidth?: number | string
}

export default function LegendOverlay({
    items,
    isCompact = false,
    maxWidth = 360,
    compactMaxWidth = 'calc(100% - 24px)',
}: LegendOverlayProps) {
    const { colorScheme } = useMantineColorScheme()

    return (
        <Box
            style={{
                position: 'absolute',
                left: 12,
                bottom: 12,
                zIndex: 3,
                maxWidth: isCompact ? compactMaxWidth : maxWidth,
            }}
        >
            <Paper
                radius="md"
                p="xs"
                bg={
                    colorScheme === 'dark'
                        ? 'rgba(0, 0, 0, 0.55)'
                        : 'rgba(255, 255, 255, 0.85)'
                }
                style={{
                    backdropFilter: 'blur(3px)',
                }}
            >
                <Legend items={items} />
            </Paper>
        </Box>
    )
}
