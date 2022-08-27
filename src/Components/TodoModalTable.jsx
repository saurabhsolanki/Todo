import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableContainer,
    Button,
    FormControl,
    Select,
    Toast,
    Box
  } from "@chakra-ui/react";
import axios from "axios";
  import {useEffect,useState} from "react";
import { fetchTodo, totalLength } from "../util/api";
import { AddTodo } from "./AddTodo";
import Pagination from "./Paggination";

import { Update } from "./UpdateTodo";
  


  
  export function TodoModalTable() {
    const [data, setdata] = useState([]);
    const [page,setPage]=useState(1)
    const [limit,setLimit]=useState(5)
    const [total,setTotal]=useState(0)
    console.log(limit,"hello",total,"total")
   

    useEffect(() => {
      getdata(page,limit)
    }, [page,limit]);
  
     const getdata = (page,limit) => {
      fetchTodo({
        page:page,
        limit:limit
      }).then(res=>{setdata(res.data)})
    };


    totalLength().then(res=>setTotal(res.data.length))


    const delelteTodo=(id)=>{
      axios.delete(`https://advsaurabh.herokuapp.com/todo/${id}`).then((res)=>{
          getdata(page,limit)
      })
  }


  const handleToggle=(id,newStatus)=>{
    axios.patch(`https://advsaurabh.herokuapp.com/todo/${id}`,newStatus).then((res)=>{
      getdata(page,limit)
  })
  }
  
    return (
      <>
      <AddTodo getdata={getdata} page={page} limit={limit}/>
        <TableContainer >
          <Table variant="striped" colorScheme="teal">
            
            <Thead>
              <Tr>
                <Th>id </Th>
                <Th>Todo name</Th>
                <Th>Toggle Todo</Th>
                <Th>Update Todo</Th>
                <Th>Delete Todo</Th>
                
              </Tr>
            </Thead>
            <Tbody>
              {data?.map((e) => (
                <Tr key={e.id}>
                  <Td>{e.id}</Td>
                  <Td>{e.text}</Td>

                  <Td><Button onClick={()=>handleToggle(e.id,{status:!e.status})}>
                    {e.status===true?"Done":"Not Done"}
                    </Button></Td>

                  <Td>
                    <Update id={e.id} getdata={getdata}/>
                    </Td>

                  <Td><Button onClick={() => delelteTodo(e.id)}>
                    Delete Todo
                    </Button></Td>
                  
                </Tr>
              ))}
            </Tbody>
          </Table>
         <div>
           <Box w='13%' bg='teal'>
          <FormControl mt={4}>
              <Select
                onChange={(e)=>setLimit(e.target.value)}
                placeholder="Set Limit - Per Page"
              >
                <option value="3">3</option>
                <option value="5">5</option>
                <option value="8">8 </option>
                <option value="10">10</option>
              </Select>
            </FormControl>
          </Box>
          <Pagination page={page} setPage={setPage} total={Math.ceil(total/limit)}/>
         </div>
        </TableContainer>
      </>
    )
  }
  