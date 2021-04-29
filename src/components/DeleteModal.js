import React from 'react';
import ReactDOM from 'react-dom';
import { Box, Heading, Button } from '@chakra-ui/react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { deleteProdusAction } from '../actions/produsActions';

function DeleteModal() {
  const history = useHistory();
  const params = useParams();
  const dispatch = useDispatch();

  const onDismiss = (e) => {
    history.push(`/produs/${params.id}`);
  };

  const onDelete = () => {
    dispatch(deleteProdusAction(params.id)).then(() => {
      history.push('/');
    });
  };

  return ReactDOM.createPortal(
    <Box display="relative" w="100%" h="100%">
      <Box
        position="fixed"
        width="100vw"
        height="100vh"
        zIndex="3"
        backgroundColor="black"
        opacity="0.5"
        left="0"
        right="0"
        bottom="0"
        top="0"
        onClick={onDismiss}
      />
      <Box
        position="fixed"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        zIndex="5"
        backgroundColor="white"
        borderRadius="8px"
        padding="32px"
      >
        <Heading pb="24px" size="md">
          Sunteti siguri ca doriti sa stergeti produsul?
        </Heading>
        <Button
          backgroundColor="blue.600"
          color="white"
          mr="32px"
          onClick={onDismiss}
        >
          Cancel
        </Button>
        <Button backgroundColor="red.600" color="white" onClick={onDelete}>
          Delete
        </Button>
      </Box>
    </Box>,
    document.querySelector('#modal_root')
  );
}

export default DeleteModal;