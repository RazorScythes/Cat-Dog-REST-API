import React, { useEffect, useState } from "react";
import { Cards } from './index'
import { useNavigate, useSearchParams } from "react-router-dom";

// Define the API keys for the Cat APIs
const DOG_API_KEY = import.meta.env.VITE_DOG_API_KEY || process.env.DOG_API_KEY

const Dogs = () => {
    // Get the navigate function from the react-router-dom library
    const navigate = useNavigate();

    // Define the states for the data, loading, page number, and item limit
    const [dogData, setDogData] = useState([]);
    const [loading, setLoading] = useState(true)
    const [searchParams, setSearchParams] = useSearchParams();

    const [page, setPage] = useState(parseInt(searchParams.get("page"), 10) || 0)
    const [limit, setLimit] = useState(parseInt(searchParams.get("limit"), 10) || 20)

    //fetch data from the APIs and update the state
    useEffect(() => {
        // Update the URL with the current page and limit values
        navigate(`${window.location.pathname}?page=${page}&limit=${limit}`);

        // Scroll back to the top of the page
        window.scrollTo(0, 0); //scroll back to top

        //async function to fetch data from the APIs
        const fetchData = async () => {
            fetch(`https://api.thedogapi.com/v1/breeds?limit=${limit}&page=${page}`, {
               headers: { 'x-api-key': DOG_API_KEY } })
            .then((res) => res.json())
            .then((result) => setDogData(result))
        };


        fetchData();
    }, [page]);

    //update the loading state when data is fetched
    useEffect(() => {
        if(dogData.length > 0) setLoading(false)
    }, [dogData])

    return (
        <div className="container mx-auto file:lg:px-8 relative px-0 py-8">
            <div className='grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-2 place-content-start'>
                { loading && <p>Loading data ...</p> }
                {
                    dogData.length > 0 && 
                        dogData.map((dog) => {
                            return (
                                <Cards
                                    key={dog.id}
                                    image={dog.image? dog.image.url : "https://www.nicepng.com/png/detail/221-2215035_404doge-doge-404.png"}
                                    animals={dog.name}
                                    desc={dog.temperament}
                                    link={`/dogs/${dog.image?.id}?type=dog`}
                                    disabled={dog.image ? false : true}
                                />
                            )
                        })
                }
            </div>
            <div className="flex md:justify-evenly justify-between pt-8"> 
                { !loading && 
                    <>  
                        <button 
                            onClick={() => page !== 0 && setPage(page - 1)}
                            className="bg-gray-800 hover:bg-transparent hover:text-gray-100 hover:border-gray-100 text-gray-100 py-2 px-12 border border-gray-700 transition-colors duration-300 ease-in-out tracking-tighter">
                            Prev
                        </button>
                        <button 
                            onClick={() => setPage(page + 1)} 
                            className="bg-gray-800 hover:bg-transparent hover:text-gray-100 hover:border-gray-100 text-gray-100 py-2 px-12 border border-gray-700 transition-colors duration-300 ease-in-out tracking-tighter">
                            Next
                        </button>
                    </>
                }
            </div>
        </div>
    )
}

export default Dogs