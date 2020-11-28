import React, { useContext } from 'react';
import { AuthContext } from '../utils/Auth';

import FileUpload from '../components/FileUpload';
const Home = () => {

    const { user } = useContext(AuthContext);

    return (
        <div>
            {user && (
                <FileUpload></FileUpload>
            )}
        </div>
    );
};

export default Home;