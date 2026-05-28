import {
    ActionIcon,
    Box,
    Paper,
    Stack,
    Text,
    Transition,
    Tooltip,
    useMantineColorScheme,
} from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { IconInfoCircle } from '@tabler/icons-react'
import { useEffect, useState } from 'react'

type OkvedLegendProps = {
    isAvailable: boolean
}

export default function OkvedLegend({ isAvailable }: OkvedLegendProps) {
    const { colorScheme } = useMantineColorScheme()
    const isDesktop = useMediaQuery('(min-width: 1024px)')
    const [opened, setOpened] = useState(false)
    const legendSrc =
        colorScheme === 'light'
            ? '/OKVEDLegendDark.svg'
            : '/OKVEDLegendLight.svg'

    useEffect(() => {
        if (!isAvailable) {
            setOpened(false)
        }
    }, [isAvailable])

    if (!isAvailable) return null

    return (
        <Box
            style={{
                position: 'absolute',
                right: 12,
                bottom: 12,
                zIndex: 4,
            }}
        >
            <Stack align="flex-end" gap={8}>
                <Transition
                    mounted={opened}
                    transition="pop"
                    duration={200}
                    timingFunction="ease"
                >
                    {(styles) => (
                        <Paper
                            radius="md"
                            p="sm"
                            bg={
                                colorScheme === 'dark'
                                    ? 'rgba(0, 0, 0, 0.55)'
                                    : 'rgba(255, 255, 255, 0.85)'
                            }
                            style={{
                                ...styles,
                                backdropFilter: 'blur(3px)',
                                maxWidth: isDesktop ? 460 : 360,
                            }}
                        >
                            <Stack gap={8}>
                                <Text size="sm" fw={600}>
                                    Легенда ОКВЭД
                                </Text>
                                <Box
                                    component="img"
                                    src={legendSrc}
                                    alt="Легенда ОКВЭД"
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                    }}
                                />
                            </Stack>
                        </Paper>
                    )}
                </Transition>
                <Tooltip label="Легенда ОКВЭД" withArrow>
                    <ActionIcon
                        variant="default"
                        bg={colorScheme === 'dark' ? 'dark.7' : 'gray.0'}
                        size="md"
                        radius="xl"
                        onClick={() => setOpened((prev) => !prev)}
                        aria-label="Показать легенду ОКВЭД"
                    >
                        <IconInfoCircle size={18} stroke={1.5} />
                    </ActionIcon>
                </Tooltip>
            </Stack>
        </Box>
    )
}
