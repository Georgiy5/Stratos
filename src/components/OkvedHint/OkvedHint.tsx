import { Button, Popover, Text } from '@mantine/core'
import { IconInfoCircle } from '@tabler/icons-react'
import { useState } from 'react'

export default function OkvedHint() {
    const [opened, setOpened] = useState(false)

    return (
        <Popover
            opened={opened}
            onChange={setOpened}
            position="bottom"
            withArrow
            shadow="md"
            closeOnClickOutside={false}
            closeOnEscape={false}
            keepMounted
        >
            <Popover.Target>
                <Button
                    variant="light"
                    size="xs"
                    radius="xl"
                    leftSection={<IconInfoCircle size={16} stroke={1.5} />}
                    onClick={() => setOpened((prev) => !prev)}
                >
                    Почему недоступно?
                </Button>
            </Popover.Target>
            <Popover.Dropdown>
                <Text size="sm">Доступно только для 2024 года</Text>
            </Popover.Dropdown>
        </Popover>
    )
}
