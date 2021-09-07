import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { MdSearch } from 'react-icons/md'

const Search = ({ placeholder, setQuerySearch }) => {
   const [searchTyping, setSearchTyping] = useState('')
   const timeoutRef = useRef(null)

   useEffect(() => {
      if (timeoutRef.current !== null) {
         clearInterval(timeoutRef.current)
      }

      timeoutRef.current = setTimeout(() => {
         timeoutRef.current = null
         setQuerySearch(searchTyping)
      }, 500)
   }, [searchTyping, setQuerySearch])

   return (
      <InputGroup w={['100%', '30%']}>
         <InputLeftElement
            pointerEvents='none'
            children={<MdSearch color='#9da1a8' size='24px' />}
         />
         <Input
            type='text'
            placeholder={placeholder}
            color='textSecondary'
            onChange={(e) => setSearchTyping(e.target.value)}
         />
      </InputGroup>
   )
}

export default Search
