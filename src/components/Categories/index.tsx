import React from 'react';

const Categories = () => {
    return (
        <div className='my-4 grid grid-cols-6 gap-4 w-[900px] items-center flex p-3 font-sans'>
            <span className='text-left'>Crypto</span>
            <span className='text-center'>Price</span>
            <span className='text-center'>Change</span>
            <span className='text-center'>Last 7 days</span>
            <span className='text-center'>Volume</span>
            <span className='text-right'>Market cap</span>
        </div>
    );
};

export default Categories;