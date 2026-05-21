import { Select, Slider, Stack, SimpleGrid } from '@mantine/core'

type SlidersProps = {
    kOptions: string[]
    lOptions: string[]
    K: string | null
    L: string | null
    setK: (value: string | null) => void
    setL: (value: string | null) => void
    kPercentOnChange: number
    setKPercentOnChange: (value: number) => void
    setKPercentOnEnd: (value: number) => void
    lPercentOnChange: number
    setLPercentOnChange: (value: number) => void
    setLPercentOnEnd: (value: number) => void
}

export default function Sliders({
    kOptions,
    lOptions,
    K,
    L,
    setK,
    setL,
    kPercentOnChange,
    setKPercentOnChange,
    setKPercentOnEnd,
    lPercentOnChange,
    setLPercentOnChange,
    setLPercentOnEnd,
}: SlidersProps) {
    return (
        <SimpleGrid cols={2} spacing={50}>
            <Stack w={'100%'} gap={40} mb={60} align="center" justify="center">
                <Select
                    label="Выберите K"
                    placeholder="Выберите K"
                    data={kOptions.map((value) => ({
                        value,
                        label: value,
                    }))}
                    value={K}
                    onChange={setK}
                    size="md"
                    allowDeselect={false}
                />
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
            </Stack>

            <Stack w={'100%'} gap={40} mb={60} align="center">
                <Select
                    label="Выберите L"
                    placeholder="Выберите L"
                    data={lOptions.map((value) => ({
                        value,
                        label: value,
                    }))}
                    value={L}
                    onChange={setL}
                    size="md"
                    allowDeselect={false}
                />

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
            </Stack>
        </SimpleGrid>
    )
}
