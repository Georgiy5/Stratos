import {
    ActionIcon,
    Burger,
    Button,
    Drawer,
    Group,
    Stack,
    Text,
    ThemeIcon,
    useMantineColorScheme,
} from '@mantine/core'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'
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
    const [opened, { open, close }] = useDisclosure(false)
    const isCompact = useMediaQuery('(max-width: 840px)')
    const isNarrow = useMediaQuery('(max-width: 540px)')

    const navItems = [
        { path: '/', label: 'О проекте', icon: IconRocket },
        { path: '/maps', label: 'Карты', icon: IconMap },
        { path: '/models', label: 'Модели', icon: IconCalculator },
    ]

    return (
        <>
            <Drawer
                opened={opened}
                onClose={close}
                position="right"
                size="xs"
                title="Навигация"
                padding="md"
                overlayProps={{ opacity: 0.55, blur: 2 }}
            >
                <Stack gap="sm">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path

                        return (
                            <Button
                                key={item.path}
                                variant={isActive ? 'light' : 'subtle'}
                                color={isActive ? 'primary.6' : 'gray'}
                                radius="xl"
                                onClick={() => {
                                    navigate(item.path)
                                    close()
                                }}
                                leftSection={
                                    <item.icon size={18} stroke={1.5} />
                                }
                                size="md"
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
                </Stack>
            </Drawer>

            <Group
                component="header"
                bg={colorScheme === 'dark' ? 'dark.6' : 'gray.0'}
                h={isCompact ? 'auto' : 72}
                px={isCompact ? 16 : 32}
                py={isCompact ? 12 : 0}
                justify="space-between"
                align="center"
                wrap={isCompact ? 'wrap' : 'nowrap'}
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
                    <ThemeIcon
                        size={isNarrow ? 32 : 36}
                        radius="md"
                        color="primary"
                    >
                        <IconChartPieFilled size={isNarrow ? 18 : 20} />
                    </ThemeIcon>
                    <Text fz={isNarrow ? 16 : 18} fw={600}>
                        СТРАТОС
                    </Text>
                </Group>

                {!isCompact && (
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
                                    leftSection={
                                        <item.icon size={18} stroke={1.5} />
                                    }
                                    size={isNarrow ? 'xs' : 'sm'}
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
                )}

                <Group gap="sm">
                    <ActionIcon
                        variant="default"
                        bg={colorScheme === 'dark' ? 'dark.7' : 'gray.0'}
                        size={isNarrow ? 'md' : 'lg'}
                        radius="xl"
                        onClick={() => toggleColorScheme()}
                    >
                        {colorScheme === 'dark' ? (
                            <IconSun size={18} stroke={1.5} />
                        ) : (
                            <IconMoon size={18} stroke={1.5} />
                        )}
                    </ActionIcon>
                    {isCompact && (
                        <Burger
                            opened={opened}
                            onClick={opened ? close : open}
                            size="sm"
                            aria-label="Открыть меню"
                        />
                    )}
                </Group>
            </Group>
        </>
    )
}
