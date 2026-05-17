import {
    Box,
    Center,
    Group,
    Paper,
    Select,
    Stack,
    Text,
    Title,
    useMantineColorScheme,
} from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { useEffect, useMemo, useState } from 'react'
import Legend from '../../components/Legend/Legend'
import LegendDescription from '../../components/LegendDescription/LegendDescription'
import Map from '../../components/Map/Map'
import PanZoom from '../../components/Map/PanZoom'
import metrics from '../../metrics/metrics.json'

type LegendItem = {
    label: string
    color: string
}

type MapMeta = Record<
    string,
    {
        description: string
        legend: LegendItem[]
    }
>

type MetricData = Record<string, Record<string, Record<string, string | null>>>

type MetricsWithMeta = MetricData & {
    mapMeta?: MapMeta
}

const metricsData = metrics as unknown as MetricsWithMeta
const metricData = metricsData as MetricData
const mapMeta = metricsData.mapMeta ?? {}

const mapOptions = [
    { value: 'Chislennost', label: 'Численность' },
    { value: 'Plotnost', label: 'Плотность' },
    { value: 'Migrations', label: 'Миграции' },
    { value: 'VRP', label: 'ВРП' },
    { value: 'Bezrabotnye', label: 'Безработные' },
    { value: 'IOK', label: 'ИОК' },
    { value: 'Dotations', label: 'Дотации' },
]

export default function Maps() {
    const { colorScheme } = useMantineColorScheme()
    const isStacked = useMediaQuery('(max-width: 1080px)')
    const isCompact = useMediaQuery('(max-width: 720px)')
    const [metricKey, setMetricKey] = useState<string | null>(
        mapOptions[0]?.value ?? null,
    )
    const selectedMap = useMemo(
        () => mapOptions.find((option) => option.value === metricKey) ?? null,
        [metricKey],
    )
    const years = useMemo(
        () =>
            selectedMap ? Object.keys(metricData[metricKey ?? ''] ?? {}) : [],
        [metricKey, selectedMap],
    )
    const [year, setYear] = useState<string | null>(years[0] ?? null)

    useEffect(() => {
        setYear(years[16] ?? null)
    }, [years])

    const colors = useMemo(() => {
        if (!year || !metricKey || !selectedMap) return {}
        return metricData[metricKey]?.[year] ?? {}
    }, [metricKey, selectedMap, year])

    const meta = metricKey ? mapMeta[metricKey] : undefined

    const mapWidth = isStacked ? 760 : 1200
    const mapHeight = mapWidth * 0.522

    return (
        <Center w="100%" p={'xl'}>
            <Box maw={1320} w="100%">
                <Stack align="center" mb={20}>
                    <Title order={2}>Карты показателей</Title>
                    <Text c="dimmed" size="md" maw={640} ta={'center'}>
                        Выберите набор данных и год, чтобы увидеть распределение
                        по регионам.
                    </Text>
                    <Select
                        placeholder="Выберите карту"
                        data={mapOptions.map(({ value, label }) => ({
                            value,
                            label,
                        }))}
                        value={metricKey}
                        onChange={setMetricKey}
                        size="sm"
                        w={isCompact ? '100%' : 260}
                    />
                </Stack>

                <Group align="stretch" gap="lg" w="100%">
                    <Paper
                        radius={18}
                        p={'xl'}
                        style={{ flex: '1 1 0' }}
                        bg={colorScheme === 'dark' ? 'dark.6' : 'gray.0'}
                    >
                        <Stack gap="lg">
                            <Center w="100%" mih={isStacked ? 420 : 520}>
                                <Box
                                    p={0}
                                    style={{
                                        position: 'relative',
                                        borderRadius: 16,
                                        border:
                                            colorScheme === 'dark'
                                                ? '1px solid rgba(255, 255, 255, 0.12)'
                                                : '1px solid rgba(0, 0, 0, 0.08)',
                                    }}
                                >
                                    <Box
                                        style={{
                                            position: 'absolute',
                                            top: 12,
                                            left: 12,
                                            zIndex: 3,
                                        }}
                                    >
                                        <Select
                                            placeholder="Выберите год"
                                            data={years}
                                            value={year}
                                            onChange={setYear}
                                            size="xs"
                                            w={isCompact ? 160 : 180}
                                        />
                                    </Box>

                                    <Box
                                        style={{
                                            position: 'absolute',
                                            left: 12,
                                            bottom: 12,
                                            zIndex: 3,
                                            maxWidth: isCompact
                                                ? 'calc(100% - 24px)'
                                                : 360,
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
                                            <Legend
                                                items={meta?.legend ?? []}
                                            />
                                        </Paper>
                                    </Box>

                                    <PanZoom
                                        width={mapWidth}
                                        height={mapHeight}
                                        background={
                                            colorScheme === 'dark'
                                                ? 'var(--mantine-color-dark-7)'
                                                : 'var(--mantine-color-gray-1)'
                                        }
                                    >
                                        <Map w={mapWidth} colors={colors} />
                                    </PanZoom>
                                </Box>
                            </Center>
                            <LegendDescription text={meta?.description} />
                        </Stack>
                    </Paper>
                </Group>
            </Box>
        </Center>
    )
}
