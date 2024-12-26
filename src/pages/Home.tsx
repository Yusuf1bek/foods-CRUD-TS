import React, { useEffect, useState } from 'react'

interface Food {
  id: string
  title: string
  desc: string
  url: string
  price: number
  oldprice: number
}

const Home: React.FC = () => {
  const [foods, setFoods] = useState<Food[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://672fb37a66e42ceaf15e7a34.mockapi.io/foods')
      .then(response => response.json())
      .then(data => {
        setFoods(data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching data:', error)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <div className='flex items-center justify-center my-[100px] text-red-500'><div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>
  }

  return (
    <div className=''>
      <h1 className="text-2xl font-bold my-4 text-center">Our Menu</h1>
      <ul className='flex flex-wrap items-center justify-center gap-[20px]'>
        {foods.map(food => (
          <li key={food.id} className="mb-[49px]">
            <div className="p-4 border rounded-xl shadow w-[350px]">
              <img className='rounded-md mb-[20px]' src={food.url} alt={food.title} width={300} height={200} />
              <h2 className="text-xl text-black mb-[20px] font-semibold">{food.title}</h2>
              <p>{food.desc}</p>
              <div className='flex items-center justify-between mt-[20px]'>
                <div className='flex items-center'>
                  <span className='text-[#ff0000] text-2xl font-semibold'>${food.price}</span>
                  <span className='text-gray-500 text-sm line-through ml-2'>${food.oldprice}</span>
                </div>
                <button className='w-[100px] p-1 rounded-lg bg-yellow-300 text-white hover:bg-transparent hover:text-yellow-400 border-[1px] border-yellow-300 duration-300'>Add to cart</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home