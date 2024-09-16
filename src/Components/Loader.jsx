import React from 'react'
import loader from './loader.gif'

export default function Loader() {
    return (
<div className="flex justify-center items-center mt-32">
  <img src={loader} alt="Loading..." className="w-16 h-16" />
</div>


    )
}