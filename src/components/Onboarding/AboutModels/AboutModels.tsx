import {
    Paper,
    ThemeIcon,
    useMantineColorScheme,
    Text,
    List,
    UnstyledButton,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconCheck } from '@tabler/icons-react'
import { useMemo, useState } from 'react'
import { MODEL_ITEMS } from './modelContent'
import classes from './AboutModels.module.css'
import AboutModelsModal from './AboutModelsModal'

export default function AboutModels() {
    const { colorScheme } = useMantineColorScheme()
    const [opened, { open, close }] = useDisclosure(false)
    const [openedId, setOpenedId] = useState<string | null>(null)
    const activeModel = useMemo(
        () => MODEL_ITEMS.find((item) => item.id === openedId) ?? null,
        [openedId],
    )

    const handleOpen = (id: string) => {
        setOpenedId(id)
        open()
    }

    const handleClose = () => {
        close()
        setOpenedId(null)
    }

    return (
        <>
            <AboutModelsModal
                opened={opened}
                onClose={handleClose}
                model={activeModel}
                colorScheme={colorScheme === 'dark' ? 'dark' : 'light'}
            />

            <Paper
                maw={800}
                p="xl"
                shadow="sm"
                bg={colorScheme === 'dark' ? 'dark.6' : 'gray.0'}
                ta={'left'}
            >
                <Text>
                    Для тех, кто хочет заглянуть за горизонт текущей статистики,
                    мы подготовили аналитический инструментарий. Вы сможете
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
                    {MODEL_ITEMS.map((item) => (
                        <List.Item key={item.id}>
                            <UnstyledButton
                                type="button"
                                onClick={() => handleOpen(item.id)}
                                className={classes.modelButton}
                            >
                                <Text span fw={600}>
                                    {item.label}
                                </Text>
                            </UnstyledButton>
                        </List.Item>
                    ))}
                </List>
                <Text>
                    Они помогут понять факторы экономического роста, оценить
                    вклад труда и капитала и даже смоделировать траекторию
                    развития одного из самых перспективных регионов России.
                </Text>
            </Paper>
        </>
    )
}
