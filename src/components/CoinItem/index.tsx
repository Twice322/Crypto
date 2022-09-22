import React from 'react';
import { ICoinData } from '../../models';
import LineChart from '../LineChart';
import { RiseOutlined, FallOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

export function numberWithCommas(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const CointItem = ({name, total_volume, market_cap, image, symbol, current_price, price_change_percentage_1h_in_currency,
    price_change_percentage_24h_in_currency,
    price_change_percentage_7d_in_currency,
    price_change_percentage_30d_in_currency,
    price_change_percentage_1y_in_currency,
     sparkline_in_7d: {price}, 
    time, id}: ICoinData) => {
    const change_percent: number | undefined = price_change_percentage_1h_in_currency || price_change_percentage_24h_in_currency || price_change_percentage_7d_in_currency || price_change_percentage_30d_in_currency || price_change_percentage_1y_in_currency

    
    return (
        <Link to={id}>
            <div className='
            w-[900px]
            border-b-[1px] 
            grid
            flex
            font-sans
            items-center
            grid-cols-6	
            gap-4
            p-3 
            border-neutral-700
            hover:bg-neutral-800	
            cursor-pointer	
            transition duration-150 ease-out hover:ease-in
            text-center
            '>
                <div className='flex items-center'>
                    <img src={image} 
                    className="
                    h-[40px] 
                    w-[40px] 
                    bg-yellow-500	
                    select-none
                    rounded-full"
                    alt="coin_image"
                    />
                    <div className='ml-3 text-left'>
                        <h1>{name.length > 8 ? `${name.substring(0, 8)}...`: name}</h1>
                        <span className='opacity-50	'>{symbol.toUpperCase()}</span>
                    </div>
                </div>
                <div>
                    {String(current_price.toFixed(3)).replace('.', ',')}<span className='ml-0.5'>$</span>
                </div>
                <div className={classNames('flex items-center text-center justify-center', {
                    'text-red-400': change_percent && change_percent < 0,
                    'text-green-400': change_percent && change_percent > 0,
                })}>
                    {change_percent && change_percent > 0 ? <RiseOutlined className='mr-[5px] mt-[2px]'/> : <FallOutlined className='mr-[5px] mt-[2px]'/>}
                    {String(change_percent?.toFixed(5)).replace('.', ',').replace('-', '')}
                    <span className='ml-1'>%</span>
                </div>
                <div>
                    <LineChart 
                    price={price} 
                    time={time}
                    display={false}
                    borderColor={'#FFF'}
                    borderWidth={2}
                    events={[]}
                    />
                </div>
                <div>
                    {numberWithCommas(total_volume)}$
                </div>
                <div>
                    {numberWithCommas(market_cap)}$
                </div>
            </div>
        </Link>
    );
};

export default CointItem;