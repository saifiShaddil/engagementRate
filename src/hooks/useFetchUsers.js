import { useState, useEffect, useRef } from "react"
import { getData } from "../getOut"

const useFetchUsers = ({ username, count }) => {
  const previousCount = useRef(count)
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState("")
  const options = {
    method: "GET",
    headers: {
      mode: 'no-cors',
      "X-RapidAPI-Key": import.meta.env.VITE_SECRET_KEY,
      "X-RapidAPI-Host": "instagram28.p.rapidapi.com",
    },
  }
  // setIsLoading(false)
  useEffect(() => {
    const controller = new AbortController()
    if(previousCount.current !== count) {
      setIsLoading(true)
      if (previousCount.current !== count) {
        fetch(
          `https://instagram28.p.rapidapi.com/user_info?user_name=${username}`, options,
          { signal: controller.signal }
        )
          .then((res) => {
            if (!res.ok) {
              throw new Error("Failed to get user.")
            }
            return res.json()
          })
          .then((data) => {
            localStorage.setItem("userData", JSON.stringify(getData(data.data)))
            setData(getData(data.data))
            setIsLoading(false)
          })
          .catch((err) => {
            setError(err)
            setIsError(true)
            setIsLoading(false)
          })
      }
    }

    return () => {
      controller.abort()
    }
  }, [count])
  return { data, isLoading, isError, error }
}

export default useFetchUsers
