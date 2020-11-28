import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import gql from 'graphql-tag';

const UPLOAD_MUTATION = gql`
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
    const onDrop = useCallback((acceptedFiles) => {

        console.log(acceptedFiles);
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <>
            <div {...getRootProps()} className={`dropzone ${isDragActive && "isActive"}`}>
                <input {...getInputProps()}></input>
                {isDragActive ? <p>Drop files here</p> : <p>Drag and drop some files here, or click to select files</p>}
            </div>
        </>
    );
};

export default FileUpload;