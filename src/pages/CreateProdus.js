import React from 'react';
import {
    Box,
    Heading,
    useColorModeValue,
  } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';

import { createProdusAction } from '../actions/produsActions';
import { useHistory } from 'react-router-dom';
import ProdusForm from '../components/ProdusForm';

function CreateProdus() {
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmitCallback = (produs) => {
    dispatch(createProdusAction(produs)).then(() => {
      history.push('/');
    });
  };

  return (
    <div>
    <Box rounded={'lg'}
bg={useColorModeValue('white', 'gray.700')}
boxShadow={'lg'}
mt="1%"
ml="28%"
mb="1%"
w={"50%"}
p={8}>
      <Heading as="h1" pb="36px">
        Creeaza o notita!
      </Heading>

      <ProdusForm onSubmitCallback={onSubmitCallback} />
    </Box>
    </div>
  );
}

export default CreateProdus;