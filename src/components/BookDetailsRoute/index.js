import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsFillStarFill} from 'react-icons/bs'
import FailureView from '../FailureView'

import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const apiStatusConstant = {
  initial: 'initial',
  success: 'success',
  failure: 'failure',
  inProgress: 'inProgress',
}

class BookShelves extends Component {
  state = {apiStatus: apiStatusConstant.initial, bookDetailData: {}}

  componentDidMount() {
    this.getBooksDetails()
  }

  getBooksDetails = async () => {
    this.setState({apiStatus: apiStatusConstant.inProgress})
    const jwtToken = Cookies.get('jwt_token')

    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/book-hub/books/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const book = data.book_details
      const updatedBoookdata = {
        aboutAuthor: book.about_author,
        aboutBook: book.about_book,
        authorName: book.author_name,
        coverPic: book.cover_pic,
        id: book.id,
        rating: book.rating,
        readStatus: book.read_status,
        title: book.title,
      }
      this.setState({
        bookDetailData: updatedBoookdata,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  renderBookItem = () => {
    const {bookDetailData} = this.state
    console.log(bookDetailData)
    const {
      coverPic,
      title,
      readStatus,
      aboutAuthor,
      aboutBook,
      authorName,
      rating,
    } = bookDetailData
    return (
      <div className="detailsRoute-container">
        <div className="details-route">
          <div className="details-book">
            <img alt={title} className="book-image" src={coverPic} />
            <div className="description">
              <h1 className="books-heading">{title}</h1>
              <p className="books-pera">{authorName}</p>
              <p className="rating">Avg Rating </p>
              <BsFillStarFill className="book-item-details-star" />
              <p>{rating}</p>
              <p className="status">
                Status:<span className="spanEl">{readStatus}</span>
              </p>
            </div>
          </div>
          <hr className="hr" />
          <div>
            <h1 className="about-author">About Author</h1>
            <p className="about-pera">{aboutAuthor}</p>
            <h1 className="about-author">About Book</h1>
            <p className="about-pera">{aboutBook}</p>
          </div>
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    )
  }

  onClickTryAgain = () => {
    this.getBooksDetails()
  }

  renderFailureView = () => (
    <FailureView onClickTryAgain={this.onClickTryAgain} />
  )

  renderProgressView = () => (
    <div testid="loader">
      <Loader
        className="loader"
        type="Oval"
        color="#0b69ff"
        height="50"
        width="50"
      />
    </div>
  )

  renderBook = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderBookItem()
      case apiStatusConstant.failure:
        return this.renderFailureView()
      case apiStatusConstant.inProgress:
        return this.renderProgressView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div>{this.renderBook()}</div>
      </>
    )
  }
}
export default BookShelves
