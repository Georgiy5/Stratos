import { Box, Select } from '@mantine/core'
import { useEffect, useMemo, useState } from 'react'
import Map from '../../components/Map/Map'
import MapCard from '../../components/MapCard/MapCard'
import metrics from '../../metrics/metrics.json'

type MetricData = Record<string, Record<string, Record<string, string | null>>>

const metricData = metrics as MetricData

const mapOptions = [
    { value: 'Chislennost', label: 'Численость', hasYear: true },
    { value: 'Plotnost', label: 'Плотность', hasYear: true },
    { value: 'Migrations', label: 'Миграции', hasYear: true },
    { value: 'VRP', label: 'ВРП', hasYear: true },
    { value: 'Bezrabotnye', label: 'Безработные', hasYear: true },
    { value: 'IOK', label: 'ИОК', hasYear: true },
    {
        value: 'Dotations',
        label: 'Дотации',
        hasYear: false,
        svgPath: '/Dotations.svg',
    },
    {
        value: 'OKVED',
        label: 'ОКВЭД рельеф',
        hasYear: false,
        svgPath: '/OKVED.svg',
    },
]

export default function Maps() {
    const [metricKey, setMetricKey] = useState<string | null>(
        mapOptions[0]?.value ?? null,
    )
    const selectedMap = useMemo(
        () => mapOptions.find((option) => option.value === metricKey) ?? null,
        [metricKey],
    )
    const years = useMemo(
        () =>
            selectedMap?.hasYear
                ? Object.keys(metricData[metricKey ?? ''] ?? {})
                : [],
        [metricKey, selectedMap?.hasYear],
    )
    const [year, setYear] = useState<string | null>(years[0] ?? null)

    useEffect(() => {
        setYear(years[0] ?? null)
    }, [years])

    const colors = useMemo(() => {
        if (!year || !metricKey || !selectedMap?.hasYear) return {}
        return metricData[metricKey]?.[year] ?? {}
    }, [metricKey, selectedMap?.hasYear, year])

    return (
        <>
            <Box maw={1400} p={'xl'}>
                <Select
                    label="Карта"
                    placeholder="Выберите карту"
                    data={mapOptions.map(({ value, label }) => ({
                        value,
                        label,
                    }))}
                    value={metricKey}
                    onChange={setMetricKey}
                    mb="md"
                />
                {selectedMap?.hasYear ? (
                    <Select
                        label="Год"
                        placeholder="Выберите год"
                        data={years}
                        value={year}
                        onChange={setYear}
                        mb="md"
                    />
                ) : null}
                {selectedMap?.svgPath ? (
                    <img src={selectedMap.svgPath} alt={selectedMap.label} />
                ) : (
                    <Map w={900} colors={colors} />
                )}
            </Box>
        </>
    )
}
