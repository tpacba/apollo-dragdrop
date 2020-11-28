import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { gql, useMutation } from '@apollo/client';

import { Button, Form } from 'semantic-ui-react';

const UPLOAD_FILE = gql`
    mutation uploadFile($file: Upload!, $post: String!) {
        uploadFile(file: $file, post: $post) {
            id
            filename
            mimetype
            path
            post
            createdAt
            username
        }
    }
`

const FileUpload = () => {
    const [values, setValues] = useState({ file: {}, post: "" });

    const [uploadFile, { loading }] = useMutation(UPLOAD_FILE, {
        update(proxy, result) {
            console.log(result);
        },
        onError(error) {
            console.error(error);
        },
        variables: values
    });

    const onDrop = useCallback((acceptedFiles) => {
        setValues({ ...values, file: acceptedFiles[0] });
        console.log(values);
    }, [values]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const onChange = (event) => {
        setValues({ ...values, post: event.target.value });
        console.log(values);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        uploadFile();
    }

    return (
        <>
            <div {...getRootProps()} className={`dropzone ${isDragActive && "isActive"}`}>
                <input {...getInputProps()}></input>
                {isDragActive ? <p>Drop files here</p> : <p>Drag and drop some files here, or click to select files</p>}
            </div>
            <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
                <Form.Field>
                    <Form.Input
                        placeholder="Insert post here"
                        name="post"
                        onChange={onChange}
                        value={values.post}
                    ></Form.Input>
                    <Button
                        type="submit"
                        color="orange"
                    >Submit</Button>
                </Form.Field>
            </Form>
        </>
    );
};

export default FileUpload;