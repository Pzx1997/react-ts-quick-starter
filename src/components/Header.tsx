import React from 'react'
import './index.less'

const Header = () => {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const handleClickButton = () => {
        alert('触发了按钮')
    }

    return (
        <div className="container">
            {/* eslint-disable-next-line react/button-has-type */}
            <button className="btn" onClick={handleClickButton}>
                触摸
            </button>
        </div>
    )
}

export default Header
