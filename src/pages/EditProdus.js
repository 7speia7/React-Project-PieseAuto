import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import {
    Box,
    Heading,
    Text
  } from '@chakra-ui/react';
import ProdusForm from '../components/ProdusForm';
import { editProdusAction } from "../actions/produsActions";

function EditProdus(props) {
  
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  
 /*  if(produs!== null){
    return (
        <Flex w="100%" h="100vh" alignItems="center" justifyContent="center">
          <Text color="red.600">Oops, nu am gasit produs</Text>
        </Flex>
      ); */
//}

 
  const produs = useSelector((state) => state.produs);
  
  const selectedProdus =  produs.find((produs) => produs._id === params.id);
  


  const onSubmitCallback = (produs) => {
    const produs_id = selectedProdus._id;
    dispatch(editProdusAction(produs_id, produs)).then(() => {
      history.push('/');
    });
  };

  const secondaryButtonClickAction = (e) => {
    history.goBack();
  };

  if (!selectedProdus) {
    return <Text>Loading...</Text>;
  }

  return (
    <div>
    <Box rounded={'lg'}
      bg={"white"}
        boxShadow={'lg'}
        mt="1%"
        ml="28%"
        mb="1%"
        w={"50%"}
        p={8}>
      <Heading as="h1" pb="36px">
        Editeaza o produs!
      </Heading>

      <ProdusForm
        onSubmitCallback={onSubmitCallback}
        inputValues={selectedProdus}
        showCancelButton
        secondaryButtonClickAction={secondaryButtonClickAction}
      />
      </Box>
    </div>
  );
}

export default EditProdus;