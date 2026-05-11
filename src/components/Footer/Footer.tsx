import {
    IconBrandInstagram,
    IconBrandTelegram,
    IconBrandTwitter,
    IconBrandVk,
    IconBrandWhatsapp,
    IconBrandYoutube,
    IconChartPieFilled,
} from '@tabler/icons-react'
import { ActionIcon, Anchor, Group, ThemeIcon, Text } from '@mantine/core'
import classes from './Footer.module.css'
import { useNavigate } from 'react-router'

const links = [
    { link: '/', label: 'О проекте' },
    { link: '/maps', label: 'Карты' },
    { link: '/models', label: 'Модели' },
]

export function FooterCentered() {
    const navigate = useNavigate()

    const items = links.map((link) => (
        <Anchor
            c="dimmed"
            key={link.label}
            href={link.link}
            lh={1}
            onClick={() => navigate(link.link)}
            size="sm"
        >
            {link.label}
        </Anchor>
    ))

    return (
        <div className={classes.footer}>
            <div className={classes.inner}>
                <Text fz={18} fw={600}>
                    СТРАТОС
                </Text>

                <Group className={classes.links}>{items}</Group>

                <Group gap="xs" justify="flex-end" wrap="nowrap">
                    <ActionIcon
                        size="lg"
                        variant="default"
                        radius="xl"
                        aria-label="Telegram"
                    >
                        <IconBrandTelegram size={18} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon
                        size="lg"
                        variant="default"
                        radius="xl"
                        aria-label="Whatsapp"
                    >
                        <IconBrandWhatsapp size={18} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon
                        size="lg"
                        variant="default"
                        radius="xl"
                        aria-label="VK"
                    >
                        <IconBrandVk size={18} stroke={1.5} />
                    </ActionIcon>
                </Group>
            </div>
        </div>
    )
}
