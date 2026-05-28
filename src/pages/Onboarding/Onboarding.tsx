import { Box, Center, Divider, SimpleGrid, Stack, Text } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import MapDescr from '../../components/Onboarding/MapDescr/MapDescr'
import AboutProject from '../../components/Onboarding/AboutProject/AboutProject'
import RegionDescr from '../../components/Onboarding/RegionDescr/RegionDescr'
import AboutModels from '../../components/Onboarding/AboutModels/AboutModels'

export default function Onboarding() {
    const isCompact = useMediaQuery('(max-width: 720px)')

    return (
        <Center p={isCompact ? 'md' : 'xl'}>
            <Stack align="center" gap={'xl'}>
                <RegionDescr />
                <AboutProject />
                <Box mt={30}>
                    <Text size="xl" fw={700} ta={'center'}>
                        Нашей командой разработаны карты региона, отображающие
                        восемь ключевых показателей:
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
                <Divider mt={30} w={isCompact ? '100%' : '70%'} />
                <Text size="xl" fw={700} ta={'center'}>
                    Погрузитесь в многогранную Кубань — от картографии до сложных
                    экономических прогнозов!
                </Text>
                <AboutModels />
            </Stack>
        </Center>
    )
}
