import { Text, Title, Box } from '@mantine/core'

type LegendDescriptionProps = {
    text?: string
}

export default function LegendDescription({ text }: LegendDescriptionProps) {
    const title = text?.split('!')[0]
    const description = text?.split('!')[1]
    const influence = text?.split('!')[2]

    return (
        <Box ta={'justify'} px={'xl'}>
            <Title order={3} fw={600} mb={12}>
                {title}
            </Title>
            <Text size="md" c="dimmed">
                {description}
            </Text>

            <Text size="md" c="dimmed">
                {influence}
            </Text>
        </Box>
    )
}
