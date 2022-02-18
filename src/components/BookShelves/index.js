import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Book from '../Book'
import FilterGroup from '../FilterGroup'
import Header from '../Header'

import './index.css'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class BookShelves extends Component {
  state = {
    booksList: [],
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
    bookshelves: [],
  }

  componentDidMount() {
    this.getbooksList()
  }

  getbooksList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {bookshelves, searchInput} = this.state
    const apiUrl = `https://apis.ccbp.in/book-hub/books?shelf=${bookshelves.join()}&search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()

      const updatedData = data.books.map(eachBook => ({
        authorName: eachBook.author_name,
        coverPic: eachBook.cover_pic,
        id: eachBook.id,
        status: eachBook.status,
        title: eachBook.title,
        rating: eachBook.rating,
        readStatus: eachBook.read_status,
      }))
      this.setState({
        booksList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  changeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getbooksList()
    }
  }

  renderBooksList = () => {
    const {booksList, searchInput, bookshelves} = this.state
    console.log(bookshelves)
    const renderBooksList = booksList.length > 0
    const searchResult = booksList.filter(each =>
      each.title.includes(searchInput),
    )

    return renderBooksList ? (
      <div className="book-list-container">
        <div className="sidebar">
          <h1 className="booksheves-heading">Bookshelves</h1>
          <h3 className="all-heading">All</h3>
          <h3 className="all-heading">Read</h3>
          <h3 className="all-heading">Curretly Reading</h3>
          <h3 className="all-heading">Want to Read</h3>
        </div>
        <div>
          <div className="search">
            <h1 className="read-books">Read Books</h1>
            <div className="search-input-container-desktop">
              <input
                type="search"
                className="search-input-desktop"
                placeholder="Search"
                onChange={this.changeSearchInput}
                onKeyDown={this.onEnterSearchInput}
              />
              <button
                type="button"
                testid="searchButton"
                className="search-button-container-desktop"
                onClick={this.getJobs}
              >
                <BsSearch className="search-icon-desktop" />
              </button>
            </div>
          </div>
          <ul className="un-order">
            {searchResult.map(book => (
              <Book bookDetails={book} key={book.id} />
            ))}
          </ul>
        </div>
      </div>
    ) : (
      <div>
        <img src="https://res.cloudinary.com/djdh5bkl5/image/upload/v1645071836/miniproject/Asset_1_1_qevmga.png" />
        <p>Your search for dsadsdsad did not find any matches.</p>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        className="failure-image"
        src="https://res.cloudinary.com/djdh5bkl5/image/upload/v1645074376/miniproject/Group_7522_desk_sigup6.png"
      />
      <p className="failure-pera">Something went wrong, Please try again.</p>
      <button type="button" className="failure-btn">
        Try Again
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height="50" width="50" />
    </div>
  )

  renderAllBooks = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderBooksList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  changeBookshelves = label => {
    this.setState(
      prev => ({bookshelves: [...prev.bookshelves, label]}),
      this.getbooksList,
    )
  }

  render() {
    const {searchInput} = this.state
    return (
      <>
        <Header />
        <div>
          <div>
            <FilterGroup
              bookshelvesList={bookshelvesList}
              searchInput={searchInput}
              changeSearchInput={this.changeSearchInput}
              bookList={this.getbooksList}
              changeBookshelves={this.changeBookshelves}
            />
          </div>

          {this.renderAllBooks()}
        </div>
      </>
    )
  }
}
export default BookShelves
