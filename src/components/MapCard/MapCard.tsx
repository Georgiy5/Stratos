import {
    Text,
    Paper,
    Image,
    Stack,
    useMantineColorScheme,
    Divider,
} from '@mantine/core'
import type { MapCardProps } from './types'
import Map from '../Map/Map'

export default function MapCard({ name, descr, img }: MapCardProps) {
    const { colorScheme } = useMantineColorScheme()

    return (
        <Paper
            p="md"
            radius="md"
            bg={colorScheme === 'dark' ? 'dark.6' : 'gray.0'}
            w={{ base: '100%', sm: 280, md: 300, lg: 380 }}
        >
            <Stack align="center">
                <Map w={300} />
                <Divider w={'100%'} />
                <Stack>
                    <Text size="lg" fw={700}>
                        {name}
                    </Text>
                    <Text c={'dimmed'}>{descr}</Text>
                </Stack>
            </Stack>
        </Paper>
    )
}
