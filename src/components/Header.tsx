import React from 'react'

const Header = () => {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const handleClickButton = () => {
        alert('触发了按钮')
    }

    return (
        <div>
            {/* eslint-disable-next-line react/button-has-type */}
            <button onClick={handleClickButton}>触摸</button>
        </div>
    )
}

export default Header
