import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link, Switch, Route } from 'react-router-dom';
import { Text, Flex, Box, Heading, Button } from '@chakra-ui/react';
import CumparaModal from '../components/CumparaModal';

function ProdusToBuy() {
    const params = useParams();
    
    
    const produs = useSelector((state) => state.produs);
   
  const selectedProdus= produs.find((produs) => produs._id === params.id);
    console.log(selectedProdus);
  if (!selectedProdus) {
    return (
      <Flex w="100%" h="100vh" alignItems="center" justifyContent="center">
        <Text color="red.600">Oops, nu am gasit produs</Text>
      </Flex>
    );
  }

  return (
    
    <Box rounded={'lg'}
bg={"white"}
boxShadow={'lg'}
mt="1%"
ml="28%"
mb="1%"
w={"50%"}
p={8}>
    <Flex justifyContent="space-between">
      <Box w="90%">
        <Heading as="h1" pb="36px" fontSize="2.5em" >
          {selectedProdus.title}
        </Heading>

        <Text fontSize="2em">Descriere: {selectedProdus.text}</Text>
        <Text mt="5%"
        fontSize="2em"       
        >Pret: {selectedProdus.price} $</Text>
      </Box>

      <Box w="25%">
        <Link to={`/produs/${selectedProdus._id}/delete`}>
          <Button
            backgroundColor="#202020"
            color="white"
            textAlign="center"
            w="120px"
            display="block"
            mb="16px"
          >
            Cumpara
          </Button>
        </Link>
      </Box>
      <Switch>
        <Route path="/produs/:id/delete" component={CumparaModal} />
      </Switch>
    </Flex>
    </Box>
  );
}

export default ProdusToBuy;