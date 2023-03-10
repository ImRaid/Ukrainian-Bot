const React = require('react')
const ReactDOMServer = require("react-dom/server")
const express = require('express')
const app = express()
const web = require('./web.js')

app.get('/', (req, res) => {
    const component = React.createElement(web)
    const html = ReactDOMServer.renderToString(component)
    res.send(html)
})

app.listen(3000, () => {
    console.log('Вебсайт хоститься на порті 3000