import React from 'react'

const Logo = (
  {
    width="100%",
    className='',
    logoClass=''
  }
) => {
  return (
    <>
    <div className={`w-[${width}] ${className}`}>
      {/* <img src="" alt=""  /> */}
      <span className={`${logoClass}  font-extrabold capitalize text-2xl text-white leading-3 tracking-[0.2rem]`}>first blog</span>

    </div>
    </>
  )
}

export default Logo
