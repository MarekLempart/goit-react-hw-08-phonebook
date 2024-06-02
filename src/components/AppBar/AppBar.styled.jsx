import {
  ContactsOutlined,
  HomeOutlined,
  IssuesCloseOutlined,
  LoginOutlined,
} from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const Nav = styled.nav`
  display: flex;
  gap: 30px;
  justify-content: space-between;
  height: 80px;
  align-items: center;
`;

export const Link = styled(NavLink)`
  :nth-child(2n + 1) {
    margin-right: 10px;
  }
  &.active {
    color: #3a97e8;
    border-top: 3px solid #3a97e8;
  }
  text-decoration: none;
  color: inherit;
  font-size: 18px;
  font-weight: 600;
  padding: 25px 20px;
`;

export const RegIcon = styled(IssuesCloseOutlined)`
  margin-right: 8px;
`;

export const LogInIcon = styled(LoginOutlined)`
  margin-right: 8px;
`;

export const HomeIcon = styled(HomeOutlined)`
  margin-right: 8px;
`;

export const ContactIcon = styled(ContactsOutlined)`
  margin-right: 8px;
`;

export const Container = styled.div`
  padding: 0 15px;
  width: 1000px;
`;

export const Header = styled.header`
  height: 70px;
  background-image: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.5),
    rgba(190, 190, 190, 0.5)
  );
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;
