import {
    ActionIcon,
    Button,
    Group,
    Text,
    ThemeIcon,
    useMantineColorScheme,
} from '@mantine/core'
import {
    IconCalculator,
    IconChartPieFilled,
    IconMap,
    IconMoon,
    IconRocket,
    IconSun,
} from '@tabler/icons-react'
import { useLocation, useNavigate } from 'react-router'

export default function Header() {
    const navigate = useNavigate()
    const location = useLocation()
    const { colorScheme, toggleColorScheme } = useMantineColorScheme()

    const navItems = [
        { path: '/', label: 'О проекте', icon: IconRocket },
        { path: '/maps', label: 'Карты', icon: IconMap },
        { path: '/models', label: 'Модели', icon: IconCalculator },
    ]

    return (
        <Group
            component="header"
            bg={colorScheme === 'dark' ? 'dark.6' : 'gray.0'}
            h={72}
            px={32}
            justify="space-between"
            align="center"
            pos={'fixed'}
            style={{
                borderBottom:
                    colorScheme === 'dark'
                        ? '1px solid var(--mantine-color-gray-9)'
                        : '1px solid var(--mantine-color-gray-2)',
                zIndex: 999,
                top: 0,
                left: 0,
                right: 0,
            }}
        >
            <Group
                gap={12}
                style={{ cursor: 'pointer' }}
                onClick={() => navigate('/')}
            >
                <ThemeIcon size={36} radius="md" color="primary">
                    <IconChartPieFilled size={20} />
                </ThemeIcon>
                <Text fz={18} fw={600}>
                    СТРАТОС
                </Text>
            </Group>

            <Group
                gap={4}
                p={4}
                bg={colorScheme === 'dark' ? 'dark.7' : 'gray.2'}
                style={{
                    border:
                        colorScheme === 'dark'
                            ? '1px solid var(--mantine-color-gray-8)'
                            : '1px solid var(--mantine-color-gray-3)',
                    borderRadius: 100,
                }}
            >
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path

                    return (
                        <Button
                            key={item.path}
                            variant={isActive ? 'light' : 'subtle'}
                            color={isActive ? 'primary.6' : 'gray'}
                            radius="xl"
                            onClick={() => navigate(item.path)}
                            leftSection={<item.icon size={18} stroke={1.5} />}
                            styles={{
                                label: {
                                    fontWeight: 500,
                                },
                            }}
                        >
                            {item.label}
                        </Button>
                    )
                })}
            </Group>

            <ActionIcon
                variant="default"
                bg={colorScheme === 'dark' ? 'dark.7' : 'gray.0'}
                size="lg"
                radius="xl"
                onClick={() => toggleColorScheme()}
            >
                {colorScheme === 'dark' ? (
                    <IconSun size={18} stroke={1.5} />
                ) : (
                    <IconMoon size={18} stroke={1.5} />
                )}
            </ActionIcon>
        </Group>
    )
}
