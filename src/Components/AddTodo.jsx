import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    useDisclosure,
  } from "@chakra-ui/react";
import axios from "axios";
  import React, { useEffect, useState} from "react";
import { fetchTodo, postTodo } from "../util/api";
import { TodoModalTable } from "./TodoModalTable";
  
  export function AddTodo({getdata,page, limit}) {
    const {isOpen, onOpen, onClose} = useDisclosure();
  
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);

    const [text,setText]=useState("")
   
   const sendTodo=(text)=>{
    const payload={
        text:text,
        status:false
    }
        postTodo(payload).then((res)=>getdata(page,limit))
        setText("")
   }
   
  //  useEffect(() => {
  //   getdata()
  // }, []);

  // const getdata = () => {
  //   // fetchTodo().then(res=>setdata(res.data))
  //   axios.get('http://localhost:5000/todo')
  // };
  
   
  
    return (
      <>
        <Button onClick={onOpen}>Add New Todo </Button>
  
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader> Add Todo</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Todo</FormLabel>
                <Input
                  ref={initialRef}
                  value={text}
                  onChange={(e)=>setText(e.target.value)}
                  placeholder="Enter Todo name"
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button
                onClick={() => {
                  sendTodo(text)
                  onClose()
                }}
                colorScheme="blue"
                mr={3}
              >
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        
      </>
    );
  }
  