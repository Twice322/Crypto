import React from 'react';
import { SearchOutlined } from '@ant-design/icons';

const SearchBar = ({handleChange, inputValue} : any) => {

    return (
        <div className='
        px-5 
        py-3 
        border-2 
        border-neutral-700 
        rounded-2xl 
        flex 
        items-center 
        focus-within:border-purple-400
        ease duration-300
        '>
            <input 
            className='bg-transparent w-full' 
            placeholder='Search...' 
            value={inputValue}
            onChange={handleChange}
            />
            <SearchOutlined/>
        </div>
    );
};

export default SearchBar;