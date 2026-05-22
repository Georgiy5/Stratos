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
    Select,
} from '@mantine/core'
import { useState } from 'react'
import ModelMap from '../../ModelMap/ModelMap'
import PanZoom from '../../Map/PanZoom'
import Description from './Description'
import { hdData } from './hdData'
import LegendOverlay from '../../LegendOverlay/LegendOverlay'
import Sliders from './Sliders'

export default function HD() {
    const { colorScheme } = useMantineColorScheme()
    const data = hdData
    const legendItems = [
        { label: 'до 9,9 млрд руб.', color: '#36A44E' },
        { label: 'от 10 до 25 млрд руб.', color: '#94E366' },
        { label: 'от 25 до 50 млрд руб.', color: '#ECD45F' },
        { label: 'от 50 до 100 млрд руб.', color: '#F29549' },
        { label: 'от 100 до 500 млрд руб.', color: '#BD3638' },
        { label: 'более 500 млрд руб.', color: '#640304' },
    ]

    const [K, setK] = useState<string | null>(
        `${data[0].K.name}, ${data[0].L.name}, ${data[0].A.name}`,
    )

    const Options = [
        ...new Set(
            data.map(
                (item) => `${item.K.name}, ${item.L.name}, ${item.A.name}`,
            ),
        ),
    ]

    const [kPercentOnChange, setKPercentOnChange] = useState(0)
    const [kPercentOnEnd, setKPercentOnEnd] = useState(0)
    const [lPercentOnChange, setLPercentOnChange] = useState(0)
    const [lPercentOnEnd, setLPercentOnEnd] = useState(0)

    const numbers =
        data.find(
            (item) => `${item.K.name}, ${item.L.name}, ${item.A.name}` === K,
        ) ?? data[0]

    const yNew =
        5383.94 *
        (1 +
            (numbers.K.value * (1 + kPercentOnEnd / 100)) /
                (numbers.L.value * (1 + lPercentOnEnd / 100)) -
            numbers.A.value)

    return (
        <Paper
            bg={colorScheme === 'dark' ? 'dark.6' : 'gray.0'}
            maw={1320}
            p={'xl'}
        >
            <Group align="stretch" gap={0} wrap="nowrap">
                <Stack style={{ flex: 1 }} p={'xl'}>
                    <Title order={3}>Модель Харрода-Домара</Title>
                    <Text size="xl">
                        Y<sub style={{ fontSize: '0.5em' }}>t + 1</sub> = Y
                        <sub style={{ fontSize: '0.5em' }}>t</sub> × ( 1 + S
                        <sub style={{ fontSize: '0.5em' }}>t</sub> / V
                        <sub style={{ fontSize: '0.5em' }}>t</sub> - A )
                    </Text>
                    <Stack w={'100%'} gap={50} align="center" justify="center">
                        <Select
                            label="Выберите переменные"
                            placeholder="Выберите переменные"
                            data={Options.map((value) => ({
                                value,
                                label: value,
                            }))}
                            value={K}
                            onChange={setK}
                            size="md"
                            allowDeselect={false}
                            miw={300}
                        />
                        <Sliders
                            numbers={numbers}
                            kPercentOnChange={kPercentOnChange}
                            setKPercentOnChange={setKPercentOnChange}
                            setKPercentOnEnd={setKPercentOnEnd}
                            lPercentOnChange={lPercentOnChange}
                            setLPercentOnChange={setLPercentOnChange}
                            setLPercentOnEnd={setLPercentOnEnd}
                        />
                    </Stack>
                </Stack>
                <Divider orientation="vertical" h={300} w={1} />
                <Box style={{ flex: 1 }}>
                    <Description />
                </Box>
            </Group>

            {/* <Text c="dimmed" size="lg" mb={10}>
                {numbers.K.name}
                {numbers.L.name}
                {numbers.A.name}
                {yNew.toFixed(2)}
            </Text> */}
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
                        <ModelMap w={1200} y={yNew} model="HD" />
                    </PanZoom>
                </Box>
            </Center>
        </Paper>
    )
}
