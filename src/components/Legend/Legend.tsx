import { Box, Group, Stack, Text } from '@mantine/core'

type LegendItem = {
    label: string
    color: string
}

type LegendProps = {
    items: LegendItem[]
}

export default function Legend({ items }: LegendProps) {
    if (!items.length) {
        return (
            <Text size="sm" c="dimmed">
                Легенда недоступна.
            </Text>
        )
    }

    return (
        <Stack px={{ base: 'sm', sm: 'xl' }} gap={10}>
            {items.map((item) => (
                <Group key={item.label} gap={10} align="center">
                    <Box
                        w={18}
                        h={18}
                        bg={item.color}
                        style={{ borderRadius: 6 }}
                    />
                    <Text size="sm">{item.label}</Text>
                </Group>
            ))}
        </Stack>
    )
}
