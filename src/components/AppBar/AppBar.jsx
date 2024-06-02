// AppBar.jsx

import { UserMenu } from 'components/UserMenu/UserMenu';
import { Spiner } from 'pages/ContactList/ContactList.styled';
import { useSelector } from 'react-redux';
import {
  ContactIcon,
  Container,
  Header,
  HomeIcon,
  Link,
  LogInIcon,
  Nav,
  RegIcon,
} from './AppBar.styled';

export const AppBar = () => {
  const { isLoaggedIn, isLoading } = useSelector(state => state.auth);

  return (
    <Header>
      {isLoading && <Spiner />}
      <Container>
        <Nav>
          <div>
            <Link to="/">
              <HomeIcon />
              Home
            </Link>
            {isLoaggedIn && (
              <Link to="/contacts">
                <ContactIcon />
                Contacts
              </Link>
            )}
          </div>
          <div>
            {isLoaggedIn ? (
              <UserMenu />
            ) : (
              <>
                <Link to="/register">
                  <RegIcon />
                  Register
                </Link>
                <Link to="/login">
                  <LogInIcon />
                  Log in
                </Link>
              </>
            )}
          </div>
        </Nav>
      </Container>
    </Header>
  );
};
