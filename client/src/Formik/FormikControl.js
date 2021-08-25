import React from 'react'
import FormikInput from './FormikInput'
import FormikRadioButton from './FormikRadioButton'
import FormikSelect from './FormikSelect'
import FormikTextArea from './FormikTextArea'

const FormikControl = (props) => {
   const { control, ...rest } = props

   switch (control) {
      case 'input':
         return <FormikInput {...rest} />
      case 'textarea':
         return <FormikTextArea {...rest} />
      case 'select':
         return <FormikSelect {...rest} />
      case 'radio':
         return <FormikRadioButton {...rest} />
      // case 'checkbox':
      //    return <Checkbox {...rest} />
      // case 'date':
      //    return <DatePicker {...rest} />
      // case 'chakrainput':
      //    return <ChakraInput {...rest} />
      default:
         return null
   }
}

export default FormikControl
