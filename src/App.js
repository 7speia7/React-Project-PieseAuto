import React, { useEffect, useState } from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import {
  Box,
  Flex,
  HStack,
  Link,
  Stack,
  Heading,
  Button
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';


import Home from './pages/Home';
import CreateProdus from './pages/CreateProdus';
import { getProdusAction,getProdusActionForUser } from './actions/produsActions';
import Produs from './pages/Produs';
import EditProdus from './pages/EditProdus.js';
import MyProdus from './pages/MyProdus.js';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import Signup from './pages/Signup';
import ProdusToBuy from './pages/ProdusToBuy';



function App() {
  
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch(`http://localhost:5000/api/auth/check-auth`, {
      headers: {
        Authorization: token,
      },
    }).then((res) => {
        switch (res.status) {
          case 200:
            setIsAuthenticated(true);
            break;
          default:
            setIsAuthenticated(false);
            break;
        }
      })
      .catch(console.error);
  }, []);
  
  const loguot = () => {
    localStorage.removeItem("token");
    fetch(`http://localhost:5000/api/auth/logout`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      switch (res.status) {
        case 200:
          setIsAuthenticated(false);
          break;
        default:
          setIsAuthenticated(true);
          break;
      }
    });
}
  const getMyProdus = () => {
    if(isAuthenticated === true){
      dispatch(getProdusActionForUser());
    }
  };
  const getProdus = () => {
    if(isAuthenticated === true){
      dispatch(getProdusAction());
    }
  };

  useEffect(() => {
    if(isAuthenticated === true){
      dispatch(getProdusAction());
    }
  }, [dispatch,isAuthenticated]);
  return (
    <div className="App">


<Box bg="#202020" px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
             
          <HStack spacing={8} alignItems={'center'} >
          <Heading color="white" as="h2">Piese Auto</Heading>
            <NavLink  to="/">
            {isAuthenticated ?
                <Link  onClick={getProdus} as="h5"  color="white">Magazin</Link>
                :null}
              </NavLink>
              <NavLink  to="/myprodus">
            {isAuthenticated ?
                <Link  onClick={getMyProdus} as="h5"  color="white">Produsele Mele</Link>
                :null}
              </NavLink>
            
              <NavLink to="/create-produs">
              {isAuthenticated ?
                <Link  color="white">Adauga Produs</Link>
                :null}
                </NavLink>
           
          </HStack>
          <Stack
            flex={{  base: 'none', md: 'inline-flex' }}
            justify={'flex-end'}
            direction={'row'}
            spacing={10}
            >
            
          <NavLink  to="/login">
            {isAuthenticated ? <Button
             display={{ base: 'none', md: 'inline-flex' }}
             color="white"
              fontSize={'16px'}
              fontWeight={400}
              bg={'#202020'}
              p={"10px"} 
              type={"button"}
              onClick={loguot}
              >
              Logout
            </Button>:
            <Link
             display={{ base: 'none', md: 'inline-flex' }}
             color="white"
              fontSize={'16px'}
              fontWeight={400}
              bg={'##202020'}
              p={"10px"} 
              
              >
              Sign In
            </Link>
            }
          </NavLink>
          <NavLink  to="/register">
          {isAuthenticated ? null:
          <Link
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'16px'}
            color={'black'}
            borderRadius={"5%"}
            bg={'#ffd100'}
            p={"10px"}
            _hover={{
              bg: '#ffee32',
              borderRadius:"5%",
              color:"white"
            }}>
            Sign Up
          </Link>
        }
          </NavLink>
        </Stack>
        </Flex>

      </Box>


      
        <Flex>
        <Box width="100%" >
          <Switch>            
             <PrivateRoute
            path="/myprodus/:id/edit"
            isAuthenticated={isAuthenticated}
            render={(props) => <EditProdus {...props} />}
          />
          
            <PrivateRoute
            path="/myprodus/:id"
            isAuthenticated={isAuthenticated}
            render={(props) => <Produs {...props} />}
          />
           <PrivateRoute
            path="/produs/:id"
            isAuthenticated={isAuthenticated}
            render={(props) => <ProdusToBuy {...props} />}
          />
          <PrivateRoute
            path="/create-produs"
            isAuthenticated={isAuthenticated}
            render={(props) => <CreateProdus {...props} />}
          />
            
            <Route
              path="/login"
              render={(props) => (
                <Login {...props} setIsAuthenticated={setIsAuthenticated} />
              )}
            />
            <Route
              path="/register"
              render={(props) => (
                <Signup {...props} setIsAuthenticated={setIsAuthenticated} />
              )}
            />
            <PrivateRoute
          path="/myprodus"
          isAuthenticated={isAuthenticated}
          render={(props) => <MyProdus {...props} />}
        />
            <PrivateRoute
              path="/"      
              isAuthenticated={isAuthenticated}
              render={(props) => <Home {...props} />}
              />
              
          </Switch>
        </Box>
        </Flex>
    </div>
      
    
  );
}

export default App;
