import { Text, Stack } from '@mantine/core'

type LegendDescriptionProps = {
    text?: string
}

export default function LegendDescription({ text }: LegendDescriptionProps) {
    return (
        <Stack py={'md'}>
            <Text fw={600} mb={8}>
                Описание карты
            </Text>
            <Text size="sm" c="dimmed">
                {text ?? 'Описание недоступно.'}
            </Text>
        </Stack>
    )
}
