import React from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../SearchBar';
import Select from '../Select';

const Header = () => {
    const navigate = useNavigate()
    return (
        <header className='flex items-center pt-[25px] flex-col '>
            <h1 className='text-5xl text-white font-mono mb-5 cursor-pointer' onClick={() => navigate('/')}><b className='text-amber-500'>C</b>ryptoPrice</h1>
            {/* <div className='flex items-center justify-between w-[900px]'>
                <SearchBar handleChange={handleChange} inputValue={inputValue}/>
                <Select/>
            </div>*/}
        </header>
    );
};

export default Header;