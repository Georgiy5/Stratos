import {
    Divider,
    Group,
    Paper,
    Stack,
    ThemeIcon,
    useMantineColorScheme,
    Text,
    List,
} from '@mantine/core'
import { IconCheck, IconWorldCheck } from '@tabler/icons-react'

export default function AboutModels() {
    const { colorScheme } = useMantineColorScheme()

    return (
        <Paper
            maw={800}
            p="xl"
            shadow="sm"
            bg={colorScheme === 'dark' ? 'dark.6' : 'gray.0'}
            ta={'left'}
        >
            <Text>
                Для тех, кто хочет заглянуть за горизонт текущей статистики, мы
                подготовили аналитический инструментарий. Вы сможете
                ознакомиться с макроэкономическими моделями:
            </Text>
            <List
                mt={20}
                mb={20}
                spacing="xs"
                size="sm"
                icon={
                    <ThemeIcon color="primary" size={24} radius="xl">
                        <IconCheck size={16} />
                    </ThemeIcon>
                }
            >
                <List.Item>Харрода-Домара</List.Item>
                <List.Item>Кобба-Дугласа </List.Item>
                <List.Item>Солоу</List.Item>
            </List>
            <Text>
                Они помогут понять факторы экономического роста, оценить вклад
                труда и капитала и даже смоделировать траекторию развития одного
                из самых перспективных регионов России.
            </Text>
        </Paper>
    )
}
