// root component of application 
import React from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Resize from './components/taskComponents/Resize';
import Convert from './components/taskComponents/Convert';
import Flip from './components/taskComponents/Flip';
import Rotate from './components/taskComponents/Rotate';
import Enhance from './components/taskComponents/Enhance';
import UploadImg from './components/taskComponents/UploadImg';
import Results from './components/Results'

import { ImageProvider } from './context/ImageContext'; // for keeping track of the image states 

const App: React.FC = () => {
    return (
        <ImageProvider>
            <div className="App">
                <Header />
                <main>
                    <UploadImg />
                    <Resize />
                    <Convert />
                    <Flip />
                    <Rotate />
                    <Enhance />
                    <Results />
                </main>
                <Footer />
            </div>
        </ImageProvider>
    );
};

export default App;
