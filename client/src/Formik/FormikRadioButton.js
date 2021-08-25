import {
   FormControl,
   FormErrorMessage,
   FormLabel,
   Radio,
   RadioGroup,
} from '@chakra-ui/react'
import { Field } from 'formik'
import React from 'react'

const FormikRadioButton = (props) => {
   const { name, label, values, required } = props
   return (
      <Field name={name}>
         {({ field, form }) => {
            const { onChange, ...rest } = field
            return (
               <FormControl
                  id={name}
                  isInvalid={form.errors[name] && form.touched[name]}
                  isRequired={required}
               >
                  <FormLabel htmlFor={name}>{label}</FormLabel>
                  <RadioGroup {...rest} id={name} {...props}>
                     {values.map((value) => (
                        <Radio
                           key={value.value}
                           onChange={onChange}
                           value={value.value}
                           mr={3}
                        >
                           {value.name}
                        </Radio>
                     ))}
                  </RadioGroup>
                  <FormErrorMessage mt='10px'>
                     {form.errors[name]}
                  </FormErrorMessage>
               </FormControl>
            )
         }}
      </Field>
   )
}

export default FormikRadioButton
