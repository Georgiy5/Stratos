import {
    Box,
    Paper,
    Text,
    Title,
    useMantineColorScheme,
    Group,
    Stack,
    Divider,
    Center,
} from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { useState } from 'react'
import ModelMap from '../../ModelMap/ModelMap'
import PanZoom from '../../Map/PanZoom'
import Sliders from './Sliders'
import Description from './Description'
import { kdData } from './kdData'
import Legend from '../../Legend/Legend'

export default function KD() {
    const { colorScheme } = useMantineColorScheme()
    const isStacked = useMediaQuery('(max-width: 1080px)')
    const isCompact = useMediaQuery('(max-width: 720px)')
    const data = kdData
    const legendItems = [
        { label: 'до 9,9 млрд руб.', color: '#36A44E' },
        { label: 'от 10 до 25 млрд руб.', color: '#94E366' },
        { label: 'от 25 до 50 млрд руб.', color: '#ECD45F' },
        { label: 'от 50 до 100 млрд руб.', color: '#F29549' },
        { label: 'от 100 до 500 млрд руб.', color: '#BD3638' },
        { label: 'более 500 млрд руб.', color: '#640304' },
    ]

    const [K, setK] = useState<string | null>(data[0].K.name)
    const [L, setL] = useState<string | null>(data[0].L.name)

    const kOptions = [...new Set(data.map((item) => item.K.name))]
    const lOptions = [...new Set(data.map((item) => item.L.name))]
    const [kPercentOnChange, setKPercentOnChange] = useState(0)
    const [kPercentOnEnd, setKPercentOnEnd] = useState(0)
    const [lPercentOnChange, setLPercentOnChange] = useState(0)
    const [lPercentOnEnd, setLPercentOnEnd] = useState(0)

    const numbers =
        data.find((item) => item.K.name === K && item.L.name === L) ?? data[0]

    const yNew =
        numbers.a0 *
        Math.pow(
            numbers.K.value *
                (1 + numbers.K.factor) *
                (1 + kPercentOnEnd / 100),
            numbers.a1,
        ) *
        Math.pow(
            numbers.L.value *
                (1 + numbers.L.factor) *
                (1 + lPercentOnEnd / 100),
            numbers.a2,
        )

    const mapWidth = isCompact ? 320 : isStacked ? 720 : 1200
    const mapHeight = mapWidth * (isCompact ? 0.9 : 0.522)

    return (
        <Paper
            bg={colorScheme === 'dark' ? 'dark.6' : 'gray.0'}
            maw={1320}
            p={isCompact ? 'md' : 'xl'}
        >
            <Group
                align="stretch"
                gap={isStacked ? 'lg' : 0}
                wrap={isStacked ? 'wrap' : 'nowrap'}
            >
                <Stack style={{ flex: 1 }} p={isCompact ? 'md' : 'xl'}>
                    <Title order={3}>Модель Кобба-Дугласа</Title>
                    <Text size="xl">
                        Y = a<sub>0</sub> × K
                        <sup>
                            a<sub>1</sub>
                        </sup>{' '}
                        × L
                        <sup>
                            a<sub>2</sub>
                        </sup>
                    </Text>
                    {isCompact && <Description />}
                    <Sliders
                        kOptions={kOptions}
                        lOptions={lOptions}
                        K={K}
                        L={L}
                        setK={setK}
                        setL={setL}
                        kPercentOnChange={kPercentOnChange}
                        setKPercentOnChange={setKPercentOnChange}
                        setKPercentOnEnd={setKPercentOnEnd}
                        lPercentOnChange={lPercentOnChange}
                        setLPercentOnChange={setLPercentOnChange}
                        setLPercentOnEnd={setLPercentOnEnd}
                    />
                </Stack>
                {!isCompact && (
                    <Divider
                        orientation={isStacked ? 'horizontal' : 'vertical'}
                        h={isStacked ? 1 : 300}
                        w={isStacked ? '100%' : 1}
                    />
                )}
                {!isCompact && (
                    <Box style={{ flex: 1 }}>
                        <Description />
                    </Box>
                )}
            </Group>

            {/* <Text c="dimmed" size="lg" mb={10}>
                Y = {numbers.a0} × {numbers.K.name}
                <sup>{numbers.a1}</sup> × {numbers.L.name}
                <sup>{numbers.a2}</sup> = {yNew.toFixed(2)}
            </Text> */}
            <Center>
                <Stack align="center" gap="sm">
                    <Box
                        style={{
                            position: 'relative',
                            borderRadius: 16,
                            border:
                                colorScheme === 'dark'
                                    ? '1px solid rgba(255, 255, 255, 0.12)'
                                    : '1px solid rgba(0, 0, 0, 0.08)',
                        }}
                    >
                        <PanZoom
                            background={
                                colorScheme === 'dark'
                                    ? 'var(--mantine-color-dark-7)'
                                    : 'var(--mantine-color-gray-1)'
                            }
                            width={mapWidth}
                            height={mapHeight}
                        >
                            <ModelMap w={mapWidth} y={yNew} model="KD" />
                        </PanZoom>
                        {!isCompact && (
                            <Box
                                style={{
                                    position: 'absolute',
                                    left: 12,
                                    bottom: 12,
                                    zIndex: 3,
                                    maxWidth: 360,
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
                                    <Legend items={legendItems} />
                                </Paper>
                            </Box>
                        )}
                    </Box>
                    {isCompact && (
                        <Paper
                            radius="md"
                            p="md"
                            w="100%"
                            bg={colorScheme === 'dark' ? 'dark.7' : 'gray.1'}
                        >
                            <Text fw={600} size="sm" mb="xs">
                                Легенда
                            </Text>
                            <Legend items={legendItems} />
                        </Paper>
                    )}
                </Stack>
            </Center>
        </Paper>
    )
}
