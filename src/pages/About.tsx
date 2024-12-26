import React, { useState, useEffect } from 'react'
import { MdDelete } from "react-icons/md"
import { FaEdit } from "react-icons/fa"
import toast, { Toaster } from 'react-hot-toast'

interface Food {
  id: string
  title: string
  desc: string
  url: string
  price: number
  oldprice: number
}

const About: React.FC = () => {
  const [foods, setFoods] = useState<Food[]>([])
  const [newFood, setNewFood] = useState<Omit<Food, 'id'>>({
    title: '',
    desc: '',
    url: '',
    price: 0,
    oldprice: 0
  })
  const [isEditing, setIsEditing] = useState(false)
  const [currentFoodId, setCurrentFoodId] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetchFoods()
  }, [])

  const fetchFoods = async () => {
    try {
      const response = await fetch('https://672fb37a66e42ceaf15e7a34.mockapi.io/foods')
      const data = await response.json()
      setFoods(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching foods:', error)
    }
  }
  if (loading) {
    return <div className='flex items-center justify-center my-[100px] text-red-500'><div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>
  }
  const createFood = async () => {
    try {
      const response = await fetch('https://672fb37a66e42ceaf15e7a34.mockapi.io/foods', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newFood)
      })
      const data = await response.json()
      setFoods([...foods, data])
      setNewFood({ title: '', desc: '', url: '', price: 0, oldprice: 0 })
      toast.success("Food added successfully!",)
    } catch (error) {
      console.error('Error creating food:', error)
    }
  }

  const updateFood = async () => {
    if (!currentFoodId) return

    try {
      const response = await fetch(`https://672fb37a66e42ceaf15e7a34.mockapi.io/foods/${currentFoodId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newFood)
      })
      const data = await response.json()
      setFoods(foods.map(food => (food.id === currentFoodId ? data : food)))
      setNewFood({ title: '', desc: '', url: '', price: 0, oldprice: 0 })
      setIsEditing(false)
      setCurrentFoodId(null)
      toast.success("Food updated successfully!",)
    } catch (error) {
      console.error('Error updating food:', error)
    }
  }

  const deleteFood = async (id: string) => {
    try {
      await fetch(`https://672fb37a66e42ceaf15e7a34.mockapi.io/foods/${id}`, {
        method: 'DELETE'
      })
      setFoods(foods.filter(food => food.id !== id))
      toast.success("Food deleted successfully!",)
    } catch (error) {
      console.error('Error deleting food:', error)
    }
  }

  const startEditing = (food: Food) => {
    setNewFood({ title: food.title, desc: food.desc, url: food.url, price: food.price, oldprice: food.oldprice })
    setIsEditing(true)
    setCurrentFoodId(food.id)
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Manage Foods</h1>
      <div className="mb-4 flex items-center justify-center gap-[20px]">
        <div className='flex flex-col gap-[10px]'>
          <input
            type="text"
            placeholder="Title"
            value={newFood.title}
            onChange={e => setNewFood({ ...newFood, title: e.target.value })}
            className="border p-2 mb-2 w-full outline-none rounded-xl"
          />
          <input
            type="text"
            placeholder="Description"
            value={newFood.desc}
            onChange={e => setNewFood({ ...newFood, desc: e.target.value })}
            className="border p-2 mb-2 w-full outline-none rounded-xl"
          />
        </div>
        <div className='flex flex-col gap-[10px]'>
          <input
            type="number"
            placeholder="Price"
            value={newFood.price}
            onChange={e => setNewFood({ ...newFood, price: parseFloat(e.target.value) })}
            className="border p-2 mb-2 w-full outline-none rounded-xl"
          />
          <input
            type="number"
            placeholder="Old Price"
            value={newFood.oldprice}
            onChange={e => setNewFood({ ...newFood, oldprice: parseFloat(e.target.value) })}
            className="border p-2 mb-2 w-full outline-none rounded-xl"
          />
        </div>
        <div className='flex flex-col gap-[10px]'>
          <input
            type="text"
            placeholder="Image URL"
            value={newFood.url}
            onChange={e => setNewFood({ ...newFood, url: e.target.value })}
            className="border p-2 mb-2 w-full outline-none rounded-xl"
          />
          <button
            onClick={isEditing ? updateFood : createFood}
            className="bg-yellow-500 mt-[5px] text-white p-2 rounded"
          >
            {isEditing ? 'Update Food' : 'Add Food'}
          </button>
        </div>
      </div>
      <ul className="flex items-center justify-center gap-[20px] flex-wrap">
        {foods.map(food => (
          <li key={food.id} className="w-[350px] border p-4 rounded shadow">
            <img src={food.url} alt={food.title} className="w-full h-48 object-cover rounded mb-4" />
            <h2 className="text-xl font-semibold mb-[15px]">{food.title}</h2>
            <p className='mb-[20px]'>{food.desc}</p>
            <div className='flex items-center gap-[30px]'>
              <p className="text-lg">Price: ${food.price}</p>
              <p className="text-gray-500">Old Price: ${food.oldprice}</p>
            </div>
            <div className="flex space-x-2 mt-2">
              <button onClick={() => startEditing(food)} className="bg-yellow-500 text-white p-2 rounded"><FaEdit/></button>
              <button onClick={() => deleteFood(food.id)} className="bg-red-500 text-white p-2 rounded"><MdDelete/></button>
            </div>
          </li>
        ))}
      </ul>
      <div><Toaster/></div>
    </div>
  )
}

export default About