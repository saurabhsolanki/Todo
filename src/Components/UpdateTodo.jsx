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
import { updateTodo } from "../util/api";





export function Update({id,getdata}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [text,setText]=useState("")

//    useEffect(()=>{
//     getTodo()
//    },[])

    const Updatevalue=(id)=>{
        const newval={
            text:text,
            status:false
        }
        updateTodo(id,newval).then((res)=>getdata())
    }

    // const getTodo=()=>{
    //     axios.get('http://localhost:5000/todo')
    // }
  
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
  
    return (
      <>
        <Button onClick={onOpen}>Update Todo</Button>
       
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update Todo</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>New Todo</FormLabel>
                <Input value={text} onChange={(e)=>setText(e.target.value)} ref={initialRef} placeholder='New Todo' />
              </FormControl>
  
              
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={()=>{
                Updatevalue(id)
                onClose()
                }}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }