import React from 'react'
import { Box, Flex, Image, NumberFormatter, Title } from '@mantine/core'
import { Team as TeamType } from '../../../types'
import { apiUrl } from '../../../api/apiUrl'
import Players from './Players'

const Team: React.FC<{ team: TeamType }> = ({ team }) => {
  return (
    <Box>
      <Flex justify='space-between' align='center'>
          <Flex align='center' gap='md'>
            <Image src={`${apiUrl}/logos/${team.badge}`} alt='Football team badge' w={90} h={90} />
            <Title order={1}>{team.name}</Title>
          </Flex>
          <div>
            <Title order={1}><NumberFormatter value={team.budget} thousandSeparator prefix='$' /></Title>
          </div>
      </Flex>
      <Box mt='lg'>
        <Title order={3} fw={400} mb='lg'>Team Players</Title>
        <Players players={team.players} />
      </Box>
    </Box>
  )
}

export default Team