import React, { useState } from "react"
import UsersMetaData from "./components/UsersMetaData"
import { getData } from "./getOut"
import useFetchUsers from "./hooks/useFetchUsers"
import Spinner from "./spinner.svg"

function App() {
  const [username, setUserName] = useState("")
  const [count, setCount] = useState(0)

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setUserName(e.target.value)
  }


  const { data:userData, isLoading, isError, error } = useFetchUsers({ username, count })

  const handleSubmit = (e) => {
    setLoading(true)
    e.preventDefault()
    setCount(count + 1)
    setTimeout(() => {
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="flex flex-col py-6 pl-6 overflow-hidden">
      <h2 className="font-bold text-3xl text-gray-600 2xl:text-5xl">
        Engagement Rate of Instagram Users
      </h2>
      <div className="flex mt-10 items-center justify-start w-screen">
        <div className="flex border-2 rounded">
          <input
            type="text"
            value={username}
            className="px-4 py-2 w-80 2xl:py-3 2xl:px-6  outline-blue-600"
            placeholder="Search Username"
            onChange={(e) => handleChange(e)}
          />
          <button
            onClick={(e) => handleSubmit(e)}
            className="flex items-center justify-center px-4 border-l hover:bg-blue-600 hover:text-white transition-all"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
            </svg>
          </button>
        </div>
      </div>
      <div className="flex flex-1 flex-col container w-full">
        {username === "" && (
          <h2 className="text-blue-600 font-semibold my-4 ml-1">
            Please enter a username!!
          </h2>
        )}
        <div className="flex flex-wrap flex-col">
          {loading || isLoading && (
            <svg role="status" className="m-5 inline w-12 h-12 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
          )}
          {isError && <h2 className="text-red-100 bg-red-400 text-lg font-medium">{error}</h2>}
          { userData && <UsersMetaData userData={userData} />}
        </div>
      </div>
    </div>
  )
}

export default App
