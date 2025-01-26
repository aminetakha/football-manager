import React from 'react'
import { Card, Flex, Image, NumberFormatter, Title } from '@mantine/core'
import { Team as TeamType } from '../../../types'
import { apiUrl } from '../../../api/apiUrl'
import Players from './Players'

const Team: React.FC<{ team: TeamType }> = ({ team }) => {
  return (
    <div>
      <Flex justify='space-between' align='center'>
          <Flex align='center' gap='md'>
            <Image src={`${apiUrl}/logos/${team.badge}`} alt='Football team badge' w={70} h={70} />
            <Title order={1}>{team.name}</Title>
          </Flex>
          <div>
            <Title order={1}><NumberFormatter value={team.budget} thousandSeparator prefix='$' /></Title>
          </div>
      </Flex>
      <Card shadow="sm" padding="lg" radius="md">
        <Card.Section>
          <Title order={3} fw={400}>Players</Title>
          <Players players={team.players} />
        </Card.Section>
      </Card>
    </div>
  )
}

export default Team