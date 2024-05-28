import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Resize from './components/Resize';
import Convert from './components/Convert';
import Flip from './components/Flip';
import Rotate from './components/Rotate';
import Enhance from './components/Enhance';
import UploadImg from './components/UploadImg';
import Results from './components/Results'

const App: React.FC = () => {
    return (
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
    );
};

export default App;
