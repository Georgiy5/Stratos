import { Modal, Stack, Text } from '@mantine/core'

const HISTORY_LABEL = 'Историческая справка'

type AboutModelsModalProps = {
    opened: boolean
    onClose: () => void
    model: {
        title: string
        description: string
        history: string
    } | null
    colorScheme: 'light' | 'dark'
}

export default function AboutModelsModal({
    opened,
    onClose,
    model,
    colorScheme,
}: AboutModelsModalProps) {
    return (
        <Modal
            opened={opened}
            onClose={onClose}
            size="lg"
            radius="lg"
            centered
            padding="xl"
            title={
                model ? (
                    <Text fw={700} size="lg">
                        {model.title}
                    </Text>
                ) : null
            }
        >
            {model && (
                <Stack gap="sm">
                    <Text
                        size="sm"
                        c={colorScheme === 'dark' ? 'gray.2' : 'dark'}
                    >
                        {model.description}
                    </Text>
                    <Text fw={600} size="sm" c="primary.6">
                        {HISTORY_LABEL}
                    </Text>
                    <Text
                        size="sm"
                        c={colorScheme === 'dark' ? 'gray.2' : 'dark'}
                    >
                        {model.history}
                    </Text>
                </Stack>
            )}
        </Modal>
    )
}
