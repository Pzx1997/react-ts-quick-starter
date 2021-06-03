import React, { Component } from 'react'
// import image from './assets/img.png'
import './app.less'
import Header from 'Comps/Header'

export default class App extends Component<any, any> {
    constructor(properties: any) {
        super(properties)
        this.state = {}
    }

    render() {
        console.log('更新')
        return (
            <div>
                hello world
                <Header />
                hello world
                <br />
                hello world
                <br />
                hello world
                <Header />
                hello world
                <Header />
            </div>
        )
    }
}
