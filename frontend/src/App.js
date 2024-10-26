import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import AddPartyPage from './pages/AddPartyPage.js';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import PartyDetails from './pages/PartyDetails.js';
import AddGuestsPage from './pages/AddGuestsPage.js';
import { Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage.js';

function AppWrapper() {
  const location = useLocation();
  const hideNavbarLinks = ['/login'];

  const isLoggedIn = () => {
    const token = localStorage.getItem('token');
    return !!token;
  };

  const user = JSON.parse(localStorage.getItem('user'));

  const signOutHandler = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.href = '/landing';
  };

  return (
    <>
      <ToastContainer position="bottom-center" limit={1} />
      <header>
        {!hideNavbarLinks.includes(location.pathname) && (
          <Navbar
            className="nav-bar space-grotesk-normal d-flex"
            variant="dark"
          >
            <LinkContainer to="/">
              <Navbar.Brand className="">PartyHub</Navbar.Brand>
            </LinkContainer>
            <Nav className="me-auto w-100 justify-content-end">
              {isLoggedIn() ? (
                <>
                  <Link to="/party" className="nav-link">
                    Add party
                  </Link>

                  <NavDropdown title="Profile">
                    <Link
                      className="dropdown-item"
                      to="#signout"
                      onClick={signOutHandler}
                    >
                      Log out
                    </Link>
                  </NavDropdown>
                </>
              ) : (
                <Link to="/auth" className="nav-link">
                  Log in
                </Link>
              )}
            </Nav>
          </Navbar>
        )}
      </header>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/" element={<HomePage />} />
        <Route
          path="/party"
          element={isLoggedIn() ? <AddPartyPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/parties/:id"
          element={isLoggedIn() ? <PartyDetails /> : <Navigate to="/login" />}
        />
        <Route
          path="/parties/:id/guests"
          element={isLoggedIn() ? <AddGuestsPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/landing"
          element={isLoggedIn() ? <Navigate to="/" /> : <LandingPage />}
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}

export default App;
