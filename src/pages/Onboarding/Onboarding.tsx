import { Box, Center, Divider, SimpleGrid, Stack, Text } from '@mantine/core'
import MapDescr from '../../components/MapDescr/MapDescr'
import AboutProject from '../../components/AboutProject/AboutProject'
import RegionDescr from '../../components/RegionDescr/RegionDescr'
import AboutModels from '../../components/AboutModels/AboutModels'

export default function Onboarding() {
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
