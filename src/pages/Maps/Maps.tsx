import {
    Box,
    Center,
    Checkbox,
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
import type { LegendItem } from '../../components/LegendOverlay/LegendOverlay'
import Legend from '../../components/Legend/Legend'
import LegendDescription from '../../components/LegendDescription/LegendDescription'
import Map from '../../components/Map/Map'
import PanZoom from '../../components/Map/PanZoom'
import OkvedLegend from '../../components/OkvedLegend/OkvedLegend'
import OkvedHint from '../../components/OkvedHint/OkvedHint'
import metrics from '../../metrics/metrics.json'

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
    { value: 'Chislennost', label: 'Численность населения' },
    { value: 'Plotnost', label: 'Плотность населения' },
    { value: 'Migrations', label: 'Миграция' },
    { value: 'VRP', label: 'Валовый региональный продукт' },
    { value: 'Bezrabotnye', label: 'Безработные' },
    { value: 'IOK', label: 'Инвестиции в основной капитал' },
    { value: 'Dotations', label: 'Дотации' },
]

export default function Maps() {
    const { colorScheme } = useMantineColorScheme()
    const isStacked = useMediaQuery('(max-width: 1080px)')
    const isCompact = useMediaQuery('(max-width: 720px)')
    const [metricKey, setMetricKey] = useState<string | null>(
        mapOptions[0]?.value ?? null,
    )
    const [showOkved, setShowOkved] = useState(false)
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
        setYear(years[years.length - 1] ?? null)
    }, [years])

    useEffect(() => {
        if (year !== '2024') {
            setShowOkved(false)
        }
    }, [year])

    const isOkvedAvailable = year === '2024'

    const colors = useMemo(() => {
        if (!year || !metricKey || !selectedMap) return {}
        return metricData[metricKey]?.[year] ?? {}
    }, [metricKey, selectedMap, year])

    const meta = metricKey ? mapMeta[metricKey] : undefined

    const mapWidth = isCompact ? 320 : isStacked ? 760 : 1200
    const mapHeight = mapWidth * (isCompact ? 0.9 : 0.522)
    const handleYearChange = (value: string | null) => {
        setYear(value)
        if (typeof document !== 'undefined') {
            requestAnimationFrame(() => {
                ;(document.activeElement as HTMLElement | null)?.blur()
            })
        }
    }

    return (
        <Center w="100%" p={isCompact ? 'md' : 'xl'}>
            <Box maw={1320} w="100%">
                <Stack align="center" mb={isCompact ? 12 : 20}>
                    <Title order={2}>Карты показателей</Title>
                    <Text c="dimmed" size="md" maw={640} ta={'center'}>
                        Выберите показатель и год, чтобы увидеть распределение
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
                        allowDeselect={false}
                        styles={{ input: { fontSize: 16 } }}
                    />
                    <Group gap={6} align="center">
                        <Checkbox
                            label="Показать ОКВЭД"
                            checked={showOkved}
                            onChange={(event) =>
                                setShowOkved(event.currentTarget.checked)
                            }
                            disabled={!isOkvedAvailable}
                        />
                        {!isOkvedAvailable && <OkvedHint />}
                    </Group>
                </Stack>

                <Group align="stretch" gap="lg" w="100%">
                    <Paper
                        radius={18}
                        p={'md'}
                        style={{ flex: '1 1 0' }}
                        bg={colorScheme === 'dark' ? 'dark.6' : 'gray.0'}
                    >
                        <Stack gap="lg">
                            <Center w="100%">
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
                                            onChange={handleYearChange}
                                            size="xs"
                                            w={isCompact ? 160 : 180}
                                            allowDeselect={false}
                                            styles={{ input: { fontSize: 16 } }}
                                        />
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
                                        <Box
                                            component="img"
                                            src="/ОКВЕД1.svg"
                                            alt="ОКВЭД"
                                            style={{
                                                position: 'absolute',
                                                top: isCompact ? -3 : 0,
                                                left: isCompact ? 0 : 0,
                                                width: '100%',
                                                height: '100%',
                                                pointerEvents: 'none',
                                                zIndex: 2,
                                                opacity:
                                                    showOkved &&
                                                    isOkvedAvailable
                                                        ? 1
                                                        : 0,
                                                transition:
                                                    'opacity 200ms ease',
                                            }}
                                        />
                                    </PanZoom>
                                    <OkvedLegend
                                        isAvailable={isOkvedAvailable}
                                    />
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
                                                <Legend
                                                    items={meta?.legend ?? []}
                                                />
                                            </Paper>
                                        </Box>
                                    )}
                                </Box>
                            </Center>
                            {isCompact && (
                                <Paper
                                    radius="md"
                                    p="md"
                                    bg={
                                        colorScheme === 'dark'
                                            ? 'dark.7'
                                            : 'gray.1'
                                    }
                                >
                                    <Text fw={600} size="sm" mb="xs">
                                        Легенда
                                    </Text>
                                    <Legend items={meta?.legend ?? []} />
                                </Paper>
                            )}
                            <LegendDescription text={meta?.description} />
                        </Stack>
                    </Paper>
                </Group>
            </Box>
        </Center>
    )
}
