import { Route, Switch, Redirect } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import './App.css';
import Homepage from './pages/homepage';
import LoginPage from './pages/loginPage';
import WatchingPage from './pages/watchingPage';
import SearchPage from './pages/searchPage';

import Header from './components/header';
import Sidebar from './components/sidebar';

import useTheme from './hooks/useTheme';

function App() {
  const { darkMode } = useTheme();

  const Layout = ({ children }) => {
    const [toggleSidebar, setToggleSidebar] = useState(false);
    const handleToggleSidebar = () => setToggleSidebar(!toggleSidebar);

    return (
      <>
        <Header handleToggleSidebar={handleToggleSidebar} />
        <div className={darkMode ? 'app-container' : 'app-container app-container-dark'}>
          <Sidebar
            toggleSidebar={toggleSidebar}
            handleToggleSidebar={handleToggleSidebar}
          />
          <Container fluid className={darkMode ? 'app-main' : 'app-main app-main-dark'}>
            {children}
          </Container>
        </div>
      </>
    );
  };

  const { accessToken, loading } = useSelector((state) => state.auth);
  const history = useHistory();

  useEffect(() => {
    if (!accessToken && !loading) {
      history.push('/login');
    }
  }, [accessToken, loading, history]);

  return (
    <Switch>
      <Route exact path="/">
        <Layout>
          <Homepage />
        </Layout>
      </Route>
      <Route path="/login" component={LoginPage} />
      <Route exact path="/watch/:id">
        <Layout>
          <WatchingPage />
        </Layout>
      </Route>
      <Route exact path="/search/:text">
        <Layout>
          <SearchPage />
        </Layout>
      </Route>
      <Route>
        <Redirect to="/" />
      </Route>
    </Switch>
  );
}

export default App;
