import express from 'express'
import axios from 'axios'

const app = express()
const port = 3000

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

const apikey = {
    params: {
        apikey: 1
    }
}

let ingrediants = []

function listIngrediants(recipe) {

}

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.post('/', async (req, res) => {
    let params = {
        params: {
            by_city: req.body.city,
            by_state: req.body.state
        }
    }
    try {
        const results = await axios.get('https://api.openbrewerydb.org/v1/breweries', params)
        res.render('index.ejs', {breweries: results.data})
    } catch (error) {
        console.log(error.message)
    }
})

app.listen(port, () => {
    console.log('Connected')
})