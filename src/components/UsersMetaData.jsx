import React, { useMemo, useRef } from "react"
import useFetchUsers from "../hooks/useFetchUsers"
import Card from "./Card"

const UsersMetaData = ({ userData }) => {
  if (userData) {
    return (
      <>
        <div className="flex flex-col gap-y-3">
          <div className="mt-2 p-2">
            <h3 className="text-md font-medium tracking-wide">
              Full Name: <span className="font-bold">{userData?.full_name}</span>
            </h3>
            <h3 className="text-md font-medium tracking-wide">
              Bio:{userData?.biography}
            </h3>
            {userData?.images?.length > 0 && (
              <h3 className="text-md font-medium tracking-wide">
                Average Engagement Rate: {userData?.engagement_rate_avg}{" "}
              </h3>
            )}
          </div>
          {userData?.images?.length > 0 ? (
            <div className="flex mt-4 flex-wrap justify-center items-start gap-2">
              {userData.images.map((image, index) => {
                return <Card key={index} image={image} />
              })}
            </div>
          ) : (
            <h2 className="text-md p-2 font-medium tracking-wide">
              Couldn't find the Posts.
            </h2>
          )}
        </div>
      </>
    )
  }
}

export default UsersMetaData
