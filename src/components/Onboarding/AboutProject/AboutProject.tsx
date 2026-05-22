import {
    Divider,
    Group,
    Paper,
    Stack,
    Text,
    ThemeIcon,
    useMantineColorScheme,
} from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { IconWorldCheck } from '@tabler/icons-react'

export default function AboutProject() {
    const { colorScheme } = useMantineColorScheme()
    const isCompact = useMediaQuery('(max-width: 720px)')

    return (
        <Paper
            w={'100%'}
            maw={1400}
            mt={30}
            p={isCompact ? 'md' : 'xl'}
            shadow="sm"
            bg={colorScheme === 'dark' ? 'dark.6' : 'gray.0'}
        >
            <Stack gap={'xl'}>
                <Group>
                    <ThemeIcon size={36} radius="md" color="primary">
                        <IconWorldCheck size={20} />
                    </ThemeIcon>
                    <Text size={'xl'} fw={700}>
                        О проекте
                    </Text>
                </Group>
                <Stack
                    ta={'left'}
                    gap={'xl'}
                    c={colorScheme === 'dark' ? 'dimmed' : 'black'}
                >
                    <Text>
                        Над созданием проекта работали студенты второго курса
                        направления «Международная экономика и бизнес» в рамках
                        модуля Terra Economicus: макроэкономическая стратегия
                        роста.
                    </Text>
                    <Divider />
                    <Text>
                        Основная цель проекта — отразить макроэкономическое
                        состояние Краснодарского края, продемонстрировать
                        ключевые социально-экономические показатели региона и
                        представить их в интерактивном формате.
                    </Text>
                    <Divider />
                    <Text>
                        В ходе работы были объединены аналитические методы,
                        экономическое моделирование и визуализация данных, что
                        позволило создать информативный и наглядный ресурс для
                        изучения региональной экономики.
                    </Text>
                </Stack>
            </Stack>
        </Paper>
    )
}
