import { Paper, Text, Title, useMantineColorScheme } from '@mantine/core'

export default function KD() {
    const { colorScheme } = useMantineColorScheme()
    // const [L, setL] = useState<number>(100)
    // const [K, setK] = useState<number>(100)
    // const data = [
    //     { K: 'ИОК', L: 'ЧРС', a0: 0.00135, a1: 0.62, a2: 10.1 },
    //     { K: 'ИОК', L: 'СФЗП', a0: 1.09, a1: 0.04, a2: 1.06 },
    //     { K: 'А', L: 'ЧРС', a0: 8.712, a1: 0.77, a2: 1.61 },
    //     { K: 'А', L: 'СФЗП', a0: 1.94, a1: 0.14, a2: 0.91 },
    //     { K: 'ДЮФЛ', L: 'СФЗП', a0: 3.036, a1: 0.23, a2: 0.74 },
    //     { K: 'ДЮФЛ', L: 'ЧРС', a0: 13.038, a1: 0.69, a2: 0.78 },
    //     { K: 'СОФ', L: 'ЧРС', a0: 4.332, a1: 0.66, a2: 0.38 },
    //     { K: 'СОФ', L: 'СФЗП', a0: 1.144, a1: -0.064, a2: 1.174 },
    // ]
    // const [numbers, setNumbers] = useState(data[0])

    return (
        <Paper bg={colorScheme === 'dark' ? 'dark.6' : 'gray.0'}>
            <Title order={2}>Модель Кобба-Дугласа</Title>
            <Text c="dimmed" size="lg">
                Y = a<sub>0</sub> × K
                <sup>
                    a<sub>1</sub>
                </sup>{' '}
                × L
                <sup>
                    a<sub>2</sub>
                </sup>
            </Text>

            {/* <Select
                placeholder="Выберите K"
                data={data.map(({ e }) => ({
                    value: e.K,
                    label: e.K,
                }))}
                value={model}
                onChange={setModel}
                size="sm"
            /> */}

            <Text c="dimmed" size="lg">
                Y = a<sub>0</sub> ×
                <sup>
                    a<sub>1</sub>
                </sup>{' '}
                ×
                <sup>
                    a<sub>2</sub>
                </sup>
            </Text>
        </Paper>
    )
}
