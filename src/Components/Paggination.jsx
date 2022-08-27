import { Button } from '@chakra-ui/react'
import React from 'react'

const Pagination = ({page,setPage,total}) => {
  console.log(total,"jaj")

    const arr= new Array(total).fill(0)
    // console.log(arr)
    // console.log(page)
  return (
    <div>
      {arr.map((el,i)=>{
       return <Button onClick={()=>setPage(i+1)} disabled={page===i+1} key={i+1}>{i+1}</Button>
      })}
    </div>
  )
}

export default Pagination
