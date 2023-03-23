import React, { useEffect, useState } from "react";
import { Cards } from './index'
import { useNavigate, useSearchParams } from "react-router-dom";

// Define the API keys for the Cat APIs
const CAT_API_KEY = import.meta.env.VITE_CAT_API_KEY || process.env.CAT_API_KEY

const Cats = () => {
    // Get the navigate function from the react-router-dom library
    const navigate = useNavigate();

    // Define the states for the data, loading, page number, and item limit
    const [catData, setCatData] = useState([]);
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
            fetch(`https://api.thecatapi.com/v1/breeds?limit=${limit}&page=${page}`, {
               headers: { 'x-api-key': CAT_API_KEY } })
            .then((res) => res.json())
            .then((result) => setCatData(result))
        };


        fetchData();
    }, [page]);

    //update the loading state when data is fetched
    useEffect(() => {
        if(catData.length > 0) setLoading(false)
    }, [catData])

    return (
        <div className="container mx-auto file:lg:px-8 relative px-0 py-8">
            <div className='grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-2 place-content-start'>
                { loading && <p>Loading data ...</p> }
                {
                    catData.length > 0 &&
                        catData.map((cat) => {
                            return (
                                    <Cards
                                        key={cat.id}
                                        image={cat.image? cat.image.url : "https://www.prestashop.com/sites/default/files/wysiwyg/404_not_found.png"}
                                        animals={cat.name}
                                        desc={cat.description}
                                        link={`/cats/${cat.image?.id}?type=cat`}
                                        disabled={cat.image ? false : true}
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

export default Cats