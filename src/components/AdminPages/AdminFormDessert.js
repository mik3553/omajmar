import React, {Component} from 'react'
import './Admin.css'


export default class AdminFormDessert extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            ingredients: '',
            price: '',
            image: ''
        }
    }
    handleChange = (event) => {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }
    handleSubmit = (event) => {
        event.preventDefault()

        const inputFile = document.getElementById('inputFileDessert')
        const formData = new FormData()
        formData.append('image', inputFile.files[0])
        formData.append('title', this.state.title)
        formData.append('ingredients', this.state.ingredients)
        formData.append('price', this.state.price)

        const options = {
            method: 'POST',
            body: formData
        };
        // delete options.headers['Content-Type'];
        fetch('https://omajmar-server.herokuapp.com/dessert/create', options)
            .then(response => {
                if (response.ok) {
                    const newEntree = { ...this.state }
                    Object.keys(newEntree)
                        .forEach(input => {
                            newEntree[input] = ''
                        })
                    this.setState({ ...newEntree })
                } else {
                }
            }).catch(error => {
                console.error(error);
            });

    }


    render() {
        return (
            <article>
                <h2>Ajouter un dessert</h2>
                <form className='adminForm' onSubmit={this.handleSubmit} >
                    <fieldset>
                        <label>titre:</label>
                        <input
                            value={this.state.title}
                            type='text'
                            name='title'
                            placeholder='titre'

                            onChange={this.handleChange} />
                    </fieldset>
                    <fieldset>
                        <label>ingredients</label>
                        <input
                            value={this.state.ingredients}
                            type='text'
                            name='ingredients'
                            placeholder='ingredients'

                            onChange={this.handleChange} />
                    </fieldset>
                    <fieldset>
                        <label>Prix:</label>
                        <input
                            value={this.state.price}
                            type='text'
                            name='price'
                            placeholder='prix'
                            onChange={this.handleChange} />
                    </fieldset>
                    <fieldset>
                        <label>Image:</label>
                        <input
                            id='inputFileDessert'
                            value={this.state.image}
                            type='file'
                            name='image'
                            placeholder='image'
                            onChange={this.handleChange} />
                    </fieldset>

                    <input type='submit' />
                </form>
            </article>
        )
    }
}