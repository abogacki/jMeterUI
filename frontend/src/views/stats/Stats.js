import React from 'react';
import StatsRouter from "./StatsRoutes";
import { Container, Columns, Column, Menu, MenuLabel, MenuList, MenuLink, Title, } from "bloomer";
import LoaderInput from '../../components/loadInput'

export const Index = props => (
    <Container>
        <Columns>
            <Column isSize='full' hasTextAlign="centered" >
                <Title className="has-text-weight-light">
                    Upload new data
                </Title>
                <LoaderInput />
            </Column>
        </Columns>
        <Columns>
            <Column isSize={3}>
                <StatsMenu />
            </Column>
            <Column isSize={9}>
                <StatsRouter />
            </Column>
        </Columns>
    </Container>
)

const StatsMenu = ({ nodes }) => {
    return (
        <Menu>
            <MenuLabel>Charts</MenuLabel>
            <MenuList>
                <li><MenuLink href="#/stats/piechart">Line chart</MenuLink></li>
                <li><MenuLink href="#/stats/piechart">Bar chart</MenuLink></li>
            </MenuList>
            <MenuLabel>Axes</MenuLabel>
        </Menu>
    )
}

export default { Index }


