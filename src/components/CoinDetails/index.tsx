import { format } from 'date-fns';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetCoinDetailsQuery, useGetCoinHistoryQuery } from '../../redux/coinGecko/coinGecho.api';
import LineChart from '../LineChart';

const separatedNumber = (number : number) => {
    const s = String(Math.floor(number)).length;
    const chars = String(Math.floor(number)).split('');
    const strWithSpaces = chars.reduceRight((acc, char, i) => {
        const spaceOrNothing = ((((s - i) % 3) === 0) ? ' ' : '');
        return (spaceOrNothing + char + acc);
    }, '');

    return `${((strWithSpaces[0] === ' ') ? strWithSpaces.slice(1) : strWithSpaces)},${String(number).split('.')[1] || '00'} $`;
}




const CoinDetails = () => {
    const { id } = useParams<string>()
    const {data: coinDetails = [], isLoading: isCoinDetailsLoading} = useGetCoinDetailsQuery(id)
    const {data = [], isLoading: isCoinHistoryLoading} = useGetCoinHistoryQuery({id: 'bitcoin', days: 1})

    if (isCoinDetailsLoading || isCoinHistoryLoading) {
        return <div></div>
    }
    return (
        <div className='flex flex-col p-6 w-[900px] my-0 mx-auto'>
            <div className='flex items-center'>
                <img src={coinDetails.image.large} 
                className="
                h-[70px] 
                w-[70px] 
                bg-yellow-500	
                select-none
                rounded-full"
                alt="coin_image"
                />
                <div className='ml-5 text-left text-3xl'>
                    <h1 className='uppercase'>{coinDetails.name}</h1>
                    <span className='opacity-50	text-xl'>{coinDetails.symbol.toUpperCase()}</span>
                </div>
            </div>
            <div className='flex justify-between w-full mt-5'>
                <div className='flex flex-col'>
                    <div className='text-2xl mb-3 uppercase'>
                        Price
                    </div>
                    <div className='text-3xl font-semibold'>
                        <span>{separatedNumber(coinDetails.market_data.current_price.usd)}</span>
                    </div>
                </div>
                <div className='text-xl flex flex-col text-center'>
                    <span className='opacity-80'>Currency <b>US Dollar - USD</b></span> 
                    <div className='flex mt-5 border-2 border-neutral-500 rounded-full'>
                        <div className='flex'>
                            <input 
                            type={'radio'} 
                            className="hidden peer" 
                            id="radio-1"
                            name='time'
                            />
                            <label 
                            htmlFor='radio-1' 
                            className='rounded-full px-5 py-2 cursor-pointer peer-checked:bg-slate-50 peer-checked:text-neutral-900'>1y</label>
                        </div>
                        <div className='flex'>
                            <input 
                            type={'radio'} 
                            className="hidden peer" 
                            id="radio-2"
                            name='time'
                            />
                            <label htmlFor='radio-2' className='rounded-full px-5 py-2 cursor-pointer peer-checked:bg-slate-50 peer-checked:text-neutral-900'>30d</label>
                        </div>
                        <div className='flex'>
                            <input type={'radio'} className="hidden peer" id="radio-3"                    
                            name='time'/>
                            <label htmlFor='radio-3' className='rounded-full px-5 py-2 cursor-pointer peer-checked:bg-slate-50 peer-checked:text-neutral-900'>7d</label>
                        </div>
                        <div className='flex'>
                            <input type={'radio'} className="hidden peer" id="radio-4"                             
                            name='time'/>
                            <label htmlFor='radio-4' className='rounded-full px-5 py-2 cursor-pointer peer-checked:bg-slate-50 peer-checked:text-neutral-900'>24h</label>
                        </div>
                    </div>
                </div>
            </div>

            <div className='my-20 '>
                <LineChart 
                        price={data.prices} 
                        time={'24h'}
                        display={true}
                        borderColor={'#f0b04f'}
                        borderWidth={3}
                        events={["mousemove", "mouseout"]}
                        />
            </div>
            <div className='flex justify-between'>
                <div className='w-[400px] h-[400px] bg-neutral-800 rounded py-5 px-7 '>
                    <h1 className='text-xl uppercase font-bold'>Price Stats</h1>
                    <div>
                        <div className='flex flex-col'>
                            <div className='flex justify-between'>
                                <span>Price</span>
                                <span className='font-semibold'>{separatedNumber(coinDetails.market_data.current_price.usd)}</span>
                            </div>
                            <div className='text-right'><span>{`${String(coinDetails.market_data.price_change_percentage_24h.toFixed(2).replace('.', ','))}%`}</span></div>
                        </div>
                        <div className='flex justify-between py-5'>
                            <span>Trading volume</span>
                            <span className='font-semibold'>{separatedNumber(coinDetails.market_data.total_volume.usd)}</span>
                        </div>
                        <div className='flex justify-between py-5'>
                            <span>24h Low /24h High</span>
                            <span className='font-semibold'>
                                {separatedNumber(coinDetails.market_data.high_24h.usd)}
                                /
                                {separatedNumber(coinDetails.market_data.low_24h.usd)}
                            </span>
                        </div>
                        <div className='flex justify-between py-5'>
                            <span>All time high</span>
                            <div className='flex flex-col text-right'>
                                <span className='font-semibold'>
                                    {separatedNumber(coinDetails.market_data.ath.usd)}
                                </span>
                                <span className='opacity-60'>
                                    {format(new Date(coinDetails.market_data.ath_date.eur), 'MM.dd.yyyy kk:mm')}
                                </span>
                            </div>
                        </div>
                        <div className='flex justify-between py-5'>
                            <span>All time low</span>
                            <div className='flex flex-col text-right'>
                                <span className='font-semibold'>
                                    {separatedNumber(coinDetails.market_data.atl.usd)}
                                </span>
                                <span className='opacity-60'>
                                    {format(new Date(coinDetails.market_data.atl_date.eur), 'MM.dd.yyyy kk:mm')}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <div className='w-[300px] h-[200px] bg-neutral-800 rounded mb-10 py-5 px-6'>
                        <h1 className='text-xl uppercase bold'>Market cap</h1>
                        <div className='flex justify-between py-3'>
                            <span>Market cap</span>
                            <span>{separatedNumber(coinDetails.market_data.market_cap.usd)}</span>
                        </div>
                        <div className='flex justify-between py-3'>
                            <span>Market cap rank</span>
                            <span>#{coinDetails.market_cap_rank}</span>
                        </div>
                        <div className='flex justify-between py-3'>
                            <span>Market cap dominance</span>
                            <span></span>
                        </div>
                    </div>
                    <div className='w-[300px] h-[200px] bg-neutral-800 rounded py-5 px-6'>
                        <h1 className='text-xl uppercase bold'>Supply</h1>
                        <div className='flex justify-between py-3'>
                            <span>Circulating supply</span>
                            <span>{String(coinDetails.market_data.circulating_supply).slice(0, 2)} M</span>
                        </div>
                        <div className='flex justify-between py-3'>
                            <span>Total supply</span>
                            <span>{String(coinDetails.market_data.total_supply).slice(0, 2)} M</span>
                        </div>
                        <div className='flex justify-between py-3'>
                            <span>Max supply</span>
                            <span>{String(coinDetails.market_data.total_supply).slice(0, 2)} M</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoinDetails;