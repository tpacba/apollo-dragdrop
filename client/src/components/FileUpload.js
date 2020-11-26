import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import PropTypes from 'prop-types';

const FileUpload = () => {
    const onDrop = useCallback((acceptedFiles) => {
        console.log(acceptedFiles);
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <>
            <div {...getRootProps()} className={`dropzone ${isDragActive && "isActive"}`}>
                <input {...getInputProps()}></input>
                {isDragActive ? <p>Drop files here</p> : <p>Drag and drop some files here, or click to select files</p>}
            </div>
        </>
    );
};

FileUpload.propTypes = {};

export default FileUpload;