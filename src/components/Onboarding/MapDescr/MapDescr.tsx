import {
    Paper,
    Stack,
    Text,
    ThemeIcon,
    useMantineColorScheme,
} from '@mantine/core'
import {
    Icon360,
    IconCoin,
    IconInvoice,
    IconMan,
    IconMoneybag,
    IconMoneybagPlus,
    IconPlane,
    IconWorld,
} from '@tabler/icons-react'

export default function MapDescr() {
    const { colorScheme } = useMantineColorScheme()

    const arr = [
        {
            name: 'Численность населения',
            descr: 'Демографический профиль региона',
            icon: <IconMan size={24} stroke={1.5} />,
        },
        {
            name: 'Плотность населения',
            descr: 'Как население распределено по территории',
            icon: <IconWorld size={24} stroke={1.5} />,
        },
        {
            name: 'Миграции',
            descr: 'Направления и маршруты перемещения людей',
            icon: <IconPlane size={24} stroke={1.5} />,
        },
        {
            name: 'Валовой региональный продукт',
            descr: 'Экономическая мощь Кубани',
            icon: <IconMoneybag size={24} stroke={1.5} />,
        },
        {
            name: 'Уровень безработицы',
            descr: 'Социальный градусник рынка труда',
            icon: <IconCoin size={24} stroke={1.5} />,
        },
        {
            name: 'Инвестиции в основной капитал',
            descr: 'Драйверы роста и обновления',
            icon: <IconMoneybagPlus size={24} stroke={1.5} />,
        },
        {
            name: 'Дотации',
            descr: 'Бюджетная поддержка и её география',
            icon: <IconInvoice size={24} stroke={1.5} />,
        },
        {
            name: 'Структура экономики по ОКВЭД',
            descr: 'Общероссийский классификатор видов экономической деятельности',
            icon: <Icon360 size={24} stroke={1.5} />,
        },
        // {
        //     name: 'Рельеф',
        //     descr: 'Природный каркас от степей до горных хребтов',
        //     icon: <IconMountain size={24} stroke={1.5} />,
        // },
    ]

    return arr.map((item) => (
        <Paper
            key={item.name}
            p="md"
            radius="md"
            bg={colorScheme === 'dark' ? 'dark.6' : 'gray.0'}
            w={{ base: '100%', sm: 280, md: 300, lg: 380 }}
        >
            <Stack h={'100%'} ta={'left'}>
                <Stack>
                    <ThemeIcon size={36}>{item.icon}</ThemeIcon>
                    <Text size="md" fw={700}>
                        {item.name}
                    </Text>
                </Stack>

                <Text c={'dimmed'}>{item.descr}</Text>
            </Stack>
        </Paper>
    ))
}
