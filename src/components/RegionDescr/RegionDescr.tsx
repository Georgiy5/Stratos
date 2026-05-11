import { Paper, Overlay, Stack, Group, Button, Text } from '@mantine/core'
import { useNavigate } from 'react-router'

export default function RegionDescr() {
    const navigate = useNavigate()

    return (
        <Paper
            w={'100%'}
            maw={1400}
            mih={600}
            bg={'url(/k.jpg)'}
            bgsz="cover"
            bgp="center"
            pos="relative"
            style={{ overflow: 'hidden' }}
        >
            <Overlay
                color="#000"
                backgroundOpacity={0.65}
                blur={4}
                zIndex={0}
            />
            <Stack
                pos="relative"
                style={{ zIndex: 1 }}
                p="xl"
                c="white"
                justify="space-between"
                align="center"
                mih={600}
            >
                <h1>Добро пожаловать в сердце юга России!</h1>
                <Text maw={'70%'}>
                    Краснодарский край — это земля, где лазурные волны Чёрного
                    моря встречаются с заснеженными пиками Кавказа, а бескрайние
                    золотые поля — с изумрудными виноградниками. Официально
                    образованный 13 сентября 1937 года, край унаследовал
                    многовековую историю кубанского казачества и стал одним из
                    самых динамичных и самобытных регионов страны. Сегодня это
                    не только главная житница России, щедро дарящая рекордные
                    урожаи пшеницы, риса и подсолнечника, но и легендарная
                    здравница, объединившая курорты Сочи, Анапы и Геленджика, а
                    ещё — крупнейший транспортный узел с мощными портами и
                    стремительно растущей экономикой. Здесь чтят традиции и
                    смело смотрят в будущее. Теперь у вас есть возможность
                    изучить этот уникальный регион в цифрах, трендах и рельефе.
                </Text>
                <Group>
                    <Button radius="xl" onClick={() => navigate('/maps')}>
                        Перейти к картам
                    </Button>
                </Group>
            </Stack>
        </Paper>
    )
}
