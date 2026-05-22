import { SimpleGrid, Slider, Stack, Text } from '@mantine/core'

type Numbers = {
    K: { name: string }
    L: { name: string }
}

type SlidersProps = {
    numbers: Numbers
    kPercentOnChange: number
    setKPercentOnChange: (value: number) => void
    setKPercentOnEnd: (value: number) => void
    lPercentOnChange: number
    setLPercentOnChange: (value: number) => void
    setLPercentOnEnd: (value: number) => void
}

export default function Sliders({
    numbers,
    kPercentOnChange,
    setKPercentOnChange,
    setKPercentOnEnd,
    lPercentOnChange,
    setLPercentOnChange,
    setLPercentOnEnd,
}: SlidersProps) {
    return (
        <SimpleGrid cols={2} spacing={50} w={'100%'}>
            <Stack w={'100%'} align="center" justify="center" gap={30}>
                <Slider
                    value={kPercentOnChange}
                    onChange={setKPercentOnChange}
                    onChangeEnd={setKPercentOnEnd}
                    label={kPercentOnChange}
                    labelAlwaysOn
                    marks={[
                        { value: 20, label: '20%' },
                        { value: 50, label: '50%' },
                        { value: 80, label: '80%' },
                    ]}
                    w={200}
                />
                <Text>
                    Изменение {numbers.K.name}
                    <sub style={{ fontSize: '0.8em' }}>t-1</sub> / ВРП
                    <sub style={{ fontSize: '0.8em' }}>t-1</sub>
                </Text>
            </Stack>
            <Stack w={'100%'} align="center" justify="center" gap={30}>
                <Slider
                    value={lPercentOnChange}
                    onChange={setLPercentOnChange}
                    onChangeEnd={setLPercentOnEnd}
                    label={lPercentOnChange}
                    labelAlwaysOn
                    marks={[
                        { value: 20, label: '20%' },
                        { value: 50, label: '50%' },
                        { value: 80, label: '80%' },
                    ]}
                    w={200}
                />
                <Text>
                    Изменение {numbers.L.name}
                    <sub style={{ fontSize: '0.8em' }}>t-1</sub> / ВРП
                    <sub style={{ fontSize: '0.8em' }}>t-1</sub>
                </Text>
            </Stack>
        </SimpleGrid>
    )
}
