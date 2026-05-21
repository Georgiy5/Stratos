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
import { useState } from 'react'
import ModelMap from '../../ModelMap/ModelMap'
import PanZoom from '../../Map/PanZoom'
import Sliders from './Sliders'
import Description from './Description'
import { kdData } from './kdData'
import LegendOverlay from '../../LegendOverlay/LegendOverlay'

export default function KD() {
    const { colorScheme } = useMantineColorScheme()
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

    return (
        <Paper
            bg={colorScheme === 'dark' ? 'dark.6' : 'gray.0'}
            maw={1320}
            p={'xl'}
        >
            <Group align="stretch" gap={0} wrap="nowrap">
                <Stack style={{ flex: 1 }} p={'xl'}>
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
                <Divider orientation="vertical" h={300} w={1} />
                <Box style={{ flex: 1 }}>
                    <Description />
                </Box>
            </Group>

            <Text c="dimmed" size="lg" mb={10}>
                Y = {numbers.a0} × {numbers.K.name}
                <sup>{numbers.a1}</sup> × {numbers.L.name}
                <sup>{numbers.a2}</sup> = {yNew.toFixed(2)}
            </Text>
            <Center>
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
                    <LegendOverlay items={legendItems} />

                    <PanZoom
                        background={
                            colorScheme === 'dark'
                                ? 'var(--mantine-color-dark-7)'
                                : 'var(--mantine-color-gray-1)'
                        }
                        width={1200}
                        height={1200 * 0.522}
                    >
                        <ModelMap w={1200} y={yNew} model="KD" />
                    </PanZoom>
                </Box>
            </Center>
        </Paper>
    )
}
