import React, { useRef } from 'react';
import { CaretDownOutlined, CaretUpOutlined  } from '@ant-design/icons';


const Select = () => {
    const [isOpened, setIsOpened] = React.useState(false)
    const selectMenu = useRef<HTMLDivElement>(null)




    React.useEffect(() => {
        const clickhandler = (e: any) => {
            if (isOpened && selectMenu.current && !selectMenu.current.closest('div')?.contains(e.target)) {
                setIsOpened(false)
            }
        }
        document.addEventListener('click', clickhandler, true)
        return () => document.removeEventListener('click', clickhandler, true)
        
    }, [isOpened])


    return (
        <div ref={selectMenu} 
        className='w-[200px] cursor-pointer justify-between px-5 py-3 border-2 border-neutral-700 flex items-center relative rounded-2xl' 
        onClick={(e) => {
            setIsOpened(!isOpened)
        }}>
            <span className='opacity-50 select-none'>Period</span>
            <span className='select-none'>{ '' }</span>
            {isOpened ? <CaretUpOutlined/> : <CaretDownOutlined />}
            {isOpened && (
                <ul className='absolute top-full bg-neutral-800 w-full text-center rounded left-0 mt-1' >
                    {/* <li className='p-2 hover:bg-purple-400 ease duration-200' onClick={(e: any) => (setCurrentTime(e.target.innerHTML))}>1y</li>
                    <li className='p-2 hover:bg-purple-400 ease duration-200' onClick={(e: any) => (setCurrentTime(e.target.innerHTML))}>30d</li>
                    <li className='p-2 hover:bg-purple-400 ease duration-200' onClick={(e: any) => (setCurrentTime(e.target.innerHTML))}>7d</li>
                    <li className='p-2 hover:bg-purple-400 ease duration-200' onClick={(e: any) => (setCurrentTime(e.target.innerHTML))}>24h</li> */}
                </ul>)
            }
        </div>
    );
};

export default Select;