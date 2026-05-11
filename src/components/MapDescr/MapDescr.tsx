import { Group, Paper, Stack, Text, useMantineColorScheme } from '@mantine/core'
import {
    IconCoin,
    IconMan,
    IconMoneybag,
    IconPlane,
    IconWorld,
} from '@tabler/icons-react'

export default function MapDescr() {
    const { colorScheme } = useMantineColorScheme()

    const arr = [
        {
            name: 'Численность населения',
            descr: 'Демографический портрет региона',
            icon: <IconMan size={32} stroke={1.5} />,
        },
        {
            name: 'Плотность населения',
            descr: 'Как люди распределены по территории',
            icon: <IconWorld size={32} stroke={1.5} />,
        },
        {
            name: 'Миграции',
            descr: 'Куда и откуда движутся человеческие потоки',
            icon: <IconPlane size={32} stroke={1.5} />,
        },
        {
            name: 'Валовой региональный продукт',
            descr: 'Экономическая мощь Кубани',
            icon: <IconMoneybag size={32} stroke={1.5} />,
        },
        {
            name: 'Уровень безработицы',
            descr: 'Социальный градусник рынка труда',
            icon: <IconCoin size={32} stroke={1.5} />,
        },
        {
            name: 'Инвестиции в основной капитал',
            descr: 'Драйверы роста и обновления',
        },
        {
            name: 'Дотации',
            descr: 'Бюджетная поддержка и её география',
        },
        {
            name: 'Структура экономики по ОКВЭД',
            descr: 'Чем живёт и зарабатывает край',
        },
        {
            name: 'Рельеф',
            descr: 'Природный каркас от степей до горных хребтов',
        },
    ]

    return arr.map((item) => (
        <Paper
            key={item.name}
            p="md"
            radius="md"
            withBorder
            bg={colorScheme === 'dark' ? 'dark.6' : 'gray.0'}
            w={300}
        >
            <Stack h={'100%'}>
                <Group>
                    {item.icon}
                    <Text size="md" fw={700}>
                        {item.name}
                    </Text>
                </Group>

                <Text c={'dimmed'}>{item.descr}</Text>
            </Stack>
        </Paper>
    ))
}
