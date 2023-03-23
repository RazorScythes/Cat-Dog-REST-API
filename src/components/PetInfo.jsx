import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams  } from 'react-router-dom'

// Define the API keys for the Cat and Dog APIs
const CAT_API_KEY = import.meta.env.VITE_CAT_API_KEY || process.env.CAT_API_KEY
const DOG_API_KEY = import.meta.env.VITE_DOG_API_KEY || process.env.DOG_API_KEY

//render cat info section
const CatInfo = ({ image_id }) => {

    const [info, setInfo] = useState({})
    const [loading, setLoading] = useState(true)

    //fetch data from the APIs and update the state
    useEffect(() => {

        //async function to fetch data from the APIs
        const fetchData = async () => {
            fetch(`https://api.thecatapi.com/v1/images/${image_id}`, 
                { headers: { 
                    'x-api-key': CAT_API_KEY,
                    'Access-Control-Allow-Origin': '*'
                } })
            .then((res) => res.json())
            .then((result) => {
                setInfo(result)
                setLoading(false)
            })
        };

        //call function fetchData
        fetchData();
    }, [])

    return (
        <>
            {
                loading ?
                    <p>Getting cat info ...</p>
                :
                info?.breeds.map((item) => {
                    return (
                        <div key={item.id}>
                            <div className="lg:flex md:flex items-center justify-center md:px-2 px-4">
                                <div className="lg:w-1/2 md:w-1/2 w-full sm:px-4">
                                    <img 
                                        src={info.url? info.url : "https://www.prestashop.com/sites/default/files/wysiwyg/404_not_found.png"}
                                        alt="animals"
                                        className='object-cover w-full md:mb-0 mb-8'
                                    />
                                </div>
                                <div className="lg:w-1/2 md:w-1/2 w-full sm:px-4">
                                    <h2 className='md:text-5xl text-3xl mb-4'>{item.name}</h2>
                                    <p className='text-lg mb-2'>Origin: {item.origin}</p>
                                    <p className='text-lg mb-2'>Temperament: {item.temperament}</p>
                                    <p className='text-lg mb-4'>Life Span: {item.life_span} Years</p>

                                    <div>
                                        <label className='text-lg'>Adaptability</label>
                                        <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700 my-2">
                                            <div className="bg-blue-600 h-4 rounded-full" style={{width: `${item.adaptability}0%`}}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <label className='text-lg'>Child Friendly</label>
                                        <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700 my-2">
                                            <div className="bg-blue-600 h-4 rounded-full" style={{width: `${item.child_friendly}0%`}}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <label className='text-lg'>Dog Friendly</label>
                                        <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700 my-2">
                                            <div className="bg-blue-600 h-4 rounded-full" style={{width: `${item.dog_friendly}0%`}}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <label className='text-lg'>Intelligence</label>
                                        <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700 my-2">
                                            <div className="bg-blue-600 h-4 rounded-full" style={{width: `${item.intelligence}0%`}}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="md:px-2 px-4 mt-8">
                                <p>{item.description}</p>
                            </div>
                        </div>
                    )
                })
            }
            
        </>
    )
}

//render dog info section
const DogInfo = ({ image_id }) => {
    const [info, setInfo] = useState({})
    const [loading, setLoading] = useState(true)

    //fetch data from the APIs and update the state
    useEffect(() => {

        //async function to fetch data from the APIs
        const fetchData = async () => {
            const [result] = await Promise.all([
                fetch(`https://api.thedogapi.com/v1/images/${image_id}`, 
                    { headers: { 
                        'x-api-key': DOG_API_KEY,
                        'Access-Control-Allow-Origin': '*'
                    } })
                .then((res) => res.json())
                .then((result) => result)
            ]);
            setInfo(result)
            setLoading(false)
            console.log(result)
        };
        //call function fetchData
        fetchData();
    }, [])

    return (
        <>
            {
                loading ?
                    <p>Getting dog info ...</p>
                :
                info?.breeds.map((item) => {
                    return (
                        <div key={item.id}>
                            <div className="lg:flex md:flex justify-center md:px-2 px-4">
                                <div className="lg:w-1/2 md:w-1/2 w-full sm:px-4">
                                    <img 
                                        src={info.url? info.url : "https://www.nicepng.com/png/detail/221-2215035_404doge-doge-404.png"}
                                        alt="animals"
                                        className='object-cover w-full md:mb-0 mb-8'
                                    />
                                </div>
                                <div className="lg:w-1/2 md:w-1/2 w-full sm:px-4">
                                    <h2 className='md:text-5xl text-3xl mb-4'>{item.name}</h2>
                                    <p className='text-lg mb-2'>Bred For: {item.bred_for ? item.bred_for : "n/a"}</p>
                                    <p className='text-lg mb-2'>Bred Group: {item.breed_group ? item.breed_group : "n/a"}</p>
                                    <p className='text-lg mb-4'>Life Span: {item.life_span} Years</p>
                                    <p className='text-lg mb-4'>Height (Metric): {item.height.metric} Years</p>
                                    <p className='text-lg mb-4'>Weight (Metric): {item.weight.metric} Years</p>
                                </div>
                            </div>
                            <div className="md:px-2 px-4 mt-8">
                                <p>{item.temperament}</p>
                            </div>
                        </div>
                    )
                })
            }
            
        </>
    )
}

const PetInfo = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { id } = useParams();

    return (
        <div className="container mx-auto file:lg:px-8 relative px-0 py-8">
            {
                searchParams.get("type") === 'cat' ?
                    <CatInfo image_id={ id }/>
                :
                searchParams.get("type") === 'dog' &&
                    <DogInfo image_id={ id }/>
            }
        </div>
    )
}

export default PetInfo