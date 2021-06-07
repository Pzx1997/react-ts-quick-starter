import React, { Component } from 'react'
// import image from './assets/img.png'
// import './index.less'
import Header from 'Comps/Header'

export default class App extends Component<unknown, unknown> {
    constructor(properties: unknown) {
        super(properties)
        this.state = {}
    }

    test = (e: unknown) => {
        console.log(e)
        alert('触发按钮')
    }

    render() {
        console.log('更新')

        return (
            <div className="container">
                hello world
                <Header />
                hello world
                <Header />
                <button type="button" onClick={this.test}>
                    确认
                </button>
            </div>
        )
    }
}
