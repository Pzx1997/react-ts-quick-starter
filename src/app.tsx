import './app.less'
// import './app.css'
import image from './assets/img.png'

const root = document.querySelector('#root')
root.innerHTML = 'hello, webpack!'

const img = document.createElement('img')
img.src = image
root.append(img)
