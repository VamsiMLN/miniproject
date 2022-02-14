import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import TopratedBooks from '../TopratedBooks'
import './index.css'

class Home extends Component {
  state = {booksData: []}

  componentDidMount() {
    this.fetchBookDetails()
  }

  fetchBookDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)
    const updatedData = data.books.map(eachBook => ({
      authorName: eachBook.author_name,
      coverPic: eachBook.cover_pic,
      id: eachBook.id,
      title: eachBook.title,
    }))
    this.setState({booksData: updatedData})
  }

  render() {
    const {booksData} = this.state
    console.log(booksData)
    return (
      <>
        <Header />
        <div className="home-main-container">
          <div className="home-container">
            <h1 className="home-heading">Find Your Next Favorite Book</h1>
            <p className="home-pera">
              You are in the right place.Tell us what titles or genres you have
              enjoyed in the past,and we will give you suprisingly insightful
              recommendations.
            </p>
            <button type="button" className="button">
              Find Books
            </button>
          </div>
          <div>
            <ul className="un-order">
              {booksData.map(eachItem => (
                <TopratedBooks details={eachItem} />
              ))}
            </ul>
          </div>
        </div>
      </>
    )
  }
}

export default Home
