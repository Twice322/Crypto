import React from 'react';
import { useGetMostPopularCoinsQuery } from '../../redux/coinGecko/coinGecho.api';
import { ICoinData } from '../../models';
import CointItem from '../../components/CoinItem';
import Categories from '../../components/Categories';
import Select from '../../components/Select';
import SearchBar from '../../components/SearchBar';
const Main = () => {
    const [time, setTime] = React.useState('24h')

    const [inputValue, setInputValue] = React.useState('')
    const handleChange = (e: any) => setInputValue(e.target.value)
    const { data = [] } = useGetMostPopularCoinsQuery({currency: 'usd', time, page: 1})
    
    return (
      <section className='w-[900px] my-0 mx-auto'>
        <div className='flex items-center pt-[25px] justify-between'>
          <SearchBar handleChange={handleChange} inputValue={inputValue}/>
          <Select/>
        </div>
        <Categories/>
        <div className='flex items-center flex-col pb-6'>
          {data && data.map((item: ICoinData) => (
            <CointItem key={item.id} {...item} time={time}/>  
          ))}
        </div>
      </section>
    );
};

export default Main;