import { Title, Text, Center, Stack, Group, Select } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { useState } from 'react'
import KD from '../../components/Models/KD/KD'
import Solou from '../../components/Models/Solou/Solou'
import HD from '../../components/Models/HD/HD'

export default function Models() {
    const isCompact = useMediaQuery('(max-width: 720px)')
    const [model, setModel] = useState<string | null>('KD')
    const modelOptions = [
        { value: 'KD', label: 'Кобба-Дугласа' },
        { value: 'Solou', label: 'Солоу' },
        { value: 'HD', label: 'Харрода-Домара' },
    ]

    return (
        <Center p={isCompact ? 'md' : 'xl'} w={'100%'}>
            <Stack maw={1320} align="center" w={'100%'}>
                <Title order={2}>Модели прогнозирования</Title>
                <Text c="dimmed" size="md" maw={640} ta={'center'}>
                    Выберите модель для прогноза.
                </Text>
                <Group justify="center" mb={20}>
                    <Select
                        placeholder="Выберите модель"
                        data={modelOptions.map(({ value, label }) => ({
                            value,
                            label,
                        }))}
                        value={model}
                        onChange={setModel}
                        size="sm"
                        allowDeselect={false}
                        w={isCompact ? '100%' : 260}
                        styles={{ input: { fontSize: 16 } }}
                    />
                </Group>
                {model === 'KD' && <KD />}
                {model === 'Solou' && <Solou />}
                {model === 'HD' && <HD />}
            </Stack>
        </Center>
    )
}
