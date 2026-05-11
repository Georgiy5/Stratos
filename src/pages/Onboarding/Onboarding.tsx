import {
    Box,
    Button,
    Center,
    Divider,
    Group,
    Overlay,
    Paper,
    SimpleGrid,
    Stack,
    Text,
    useMantineColorScheme,
} from '@mantine/core'
import { useNavigate } from 'react-router'
import MapDescr from '../../components/MapDescr/MapDescr'
import AboutProject from '../../components/AboutProject/AboutProject'
import RegionDescr from '../../components/RegionDescr/RegionDescr'
import AboutModels from '../../components/AboutModels/AboutModels'

export default function Onboarding() {
    const navigate = useNavigate()

    return (
        <Center p={'xl'}>
            <Stack align="center" gap={'xl'}>
                <RegionDescr />
                <AboutProject />
                <Box mt={30}>
                    <Text size="xl" fw={700} ta={'center'}>
                        Нашей командой разработаны карты региона, отображающие
                        девять ключевых показателей:
                    </Text>
                </Box>
                <Center w={'100%'}>
                    <SimpleGrid
                        mt={'sm'}
                        cols={{ base: 1, sm: 2, md: 3 }}
                        spacing="xl"
                    >
                        <MapDescr />
                    </SimpleGrid>
                </Center>
                <Divider mt={30} w={'70%'} />
                <Text size="xl" fw={700} ta={'center'}>
                    Погрузитесь в многогранную Кубань — от рельефа до сложных
                    экономических прогнозов!
                </Text>
                <AboutModels />
            </Stack>
        </Center>
    )
}
