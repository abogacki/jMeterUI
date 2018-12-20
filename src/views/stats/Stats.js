import React from 'react';
import StatsRouter from "./StatsRoutes";
import { Container, Columns, Column, Menu, MenuLabel, MenuList, MenuLink,  } from "bloomer";

export const Index = props => (
    <Container>
        <Columns>
            <Column isSize={3}>
                <Menu>
                    <MenuLabel>General</MenuLabel>
                    <MenuList>
                        <li><MenuLink href="/">Dashboard</MenuLink></li>
                        <li><MenuLink href="/">Customers</MenuLink></li>
                    </MenuList>
                    <MenuLabel>Administration</MenuLabel>
                    <MenuList>
                        <li><MenuLink href="/">Team Settings</MenuLink></li>
                        <li><MenuLink isActive>Manage Your Team</MenuLink></li>
                        <MenuList>
                            <li><MenuLink href="/">Members</MenuLink></li>
                            <li><MenuLink href="/">Plugins</MenuLink></li>
                            <li><MenuLink href="/">Add a Member</MenuLink></li>
                        </MenuList>
                        <li><MenuLink href="/">Invitations</MenuLink></li>
                        <li><MenuLink href="/">Authentication</MenuLink></li>
                    </MenuList>
                    <MenuLabel>Transactions</MenuLabel>
                    <MenuList>
                        <li><MenuLink href="/">Payments</MenuLink></li>
                        <li><MenuLink href="/">Transfers</MenuLink></li>
                        <li><MenuLink href="/">Balance</MenuLink></li>
                    </MenuList>
                </Menu>
            </Column>
            <Column isSize={9}>
                <StatsRouter />
            </Column>
        </Columns>
    </Container>
)

export default { Index }


