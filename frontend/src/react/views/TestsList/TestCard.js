import React from 'react'
import { Column } from 'bloomer/lib/grid/Column';
import { CardContent } from 'bloomer/lib/components/Card/CardContent';
import { Content } from 'bloomer/lib/elements/Content';
import { Heading } from 'bloomer/lib/elements/Heading';
import { Icon } from 'bloomer/lib/elements/Icon';
import { Title } from 'bloomer/lib/elements/Title';
import { Level } from 'bloomer/lib/components/Level/Level';
import { LevelItem } from 'bloomer/lib/components/Level/LevelItem';
import { Box } from 'bloomer/lib/elements/Box';
import { Button } from 'bloomer/lib/elements/Button';
import { LevelLeft } from 'bloomer/lib/components/Level/LevelLeft';
import { LevelRight } from 'bloomer/lib/components/Level/LevelRight';

const convertDate = (date) => {
  const d = new Date(date)
  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
}

const TestCard = ({ name, createdAt, testData, ...props }) => {
  const date = convertDate(createdAt)
  return (
    <Column className="is-4">
      <Box className="notification is-white">
        <CardContent>
          <Content>
            <Heading>
              <Icon className="far fa-chart-bar" />
              Test name:
            </Heading>
            <Title>{name}</Title>
            <hr />
            <Level>
              <LevelLeft>
                <LevelItem>
                  <div>
                    <Heading>Uploaded at:</Heading>
                    <Title isSize={6}>
                      {date}
                    </Title>
                  </div>
                </LevelItem>
              </LevelLeft>
              <LevelRight>
                <LevelItem>
                  <div>
                    <Heading>
                      Requests samples count:
                    </Heading>
                    <Title isSize={6}>
                      {testData.length}
                    </Title>
                  </div>
                </LevelItem>
              </LevelRight>
            </Level>
            <Button className="is-rounded is-info" href={`/#/stats/${props['_id']}`}>Details</Button>
          </Content>
        </CardContent>
      </Box>
    </Column>
  )
}

export default TestCard