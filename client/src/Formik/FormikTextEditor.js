import React, { useEffect, useState } from 'react'
import { Field, ErrorMessage } from 'formik'
import {
   FormControl,
   FormErrorMessage,
   FormLabel,
   Input,
   Skeleton,
} from '@chakra-ui/react'

import { EditorState, convertFromHTML, ContentState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { stateToHTML } from 'draft-js-export-html'

function FormikTextEditor(props) {
   const {
      label,
      name,
      type = 'text',
      validate,
      required,
      body,
      ...rest
   } = props

   const [editorState, setEditorState] = useState(() =>
      EditorState.createEmpty()
   )

   const editorHTML = stateToHTML(editorState.getCurrentContent())

   useEffect(() => {
      if (body !== undefined) {
         const blocksFromHTML = convertFromHTML(body)
         const state = ContentState.createFromBlockArray(
            blocksFromHTML.contentBlocks,
            blocksFromHTML.entityMap
         )

         setEditorState(EditorState.createWithContent(state))
      }
   }, [])

   return (
      <Field name={name} validate={validate}>
         {({ field, form }) => (
            <FormControl
               id={name}
               isInvalid={form.errors[name] && form.touched[name]}
               isRequired={required}
            >
               {label && <FormLabel color='text'>{label}</FormLabel>}
               <Input {...field} {...rest} type='hidden' />
               <Editor
                  editorStyle={{
                     border: '1px solid #e3dfde',
                     minHeight: '140px',
                  }}
                  onChange={(e) => {
                     form.setFieldValue('body', editorHTML)
                  }}
                  editorState={editorState}
                  toolbarClassName='toolbarClassName'
                  wrapperClassName='wrapperClassName'
                  editorClassName='editorClassName'
                  onEditorStateChange={setEditorState}
               />
               <FormErrorMessage mt='10px' color='red'>
                  {form.errors[name]}
               </FormErrorMessage>
            </FormControl>
         )}
      </Field>
   )
}

export default FormikTextEditor