import { Title, Text, Center, Stack, Group, Select } from '@mantine/core'
import { useState } from 'react'
import KD from '../../components/Models/KD/KD'
import Solou from '../../components/Models/Solou/Solou'
import HD from '../../components/Models/HD/HD'

export default function Models() {
    const [model, setModel] = useState<string | null>(null)
    const modelOptions = [
        { value: 'KD', label: 'Кобба-Дугласа' },
        { value: 'Solou', label: 'Солоу' },
        { value: 'HD', label: 'Харрода-Домара' },
    ]

    return (
        <Center p={'xl'} w={'100%'}>
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
                    />
                </Group>
                {model === 'KD' && <KD />}
                {model === 'Solou' && <Solou />}
                {model === 'HD' && <HD />}
            </Stack>
        </Center>
    )
}
