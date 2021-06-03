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
        return (
            <div>
                hello world
                <Header />
            </div>
        )
    }
}
