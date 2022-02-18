import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Cookies from 'js-cookie'
import Slider from 'react-slick'

import Header from '../Header'
import './index.css'

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {bookData: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.fetchBookDetails()
  }

  fetchBookDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = data.books.map(eachBook => ({
        authorName: eachBook.author_name,
        coverPic: eachBook.cover_pic,
        id: eachBook.id,
        title: eachBook.title,
      }))
      this.setState({
        bookData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 401) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderSlider = () => {
    const {bookData} = this.state
    return (
      <Slider {...settings}>
        {bookData.map(eachLogo => {
          const {coverPic, id, title, authorName} = eachLogo
          return (
            <li className="slick-item" key={id}>
              <img className="logo-image" src={coverPic} alt="company logo" />
              <h3 className="title"> {title}</h3>
              <h6 className="author-name">{authorName}</h6>
            </li>
          )
        })}
      </Slider>
    )
  }

  renderTopRatedBooks = () => (
    <div className="">
      <ul className="un-orderlist">
        <div className="slick-container">{this.renderSlider()}</div>
      </ul>
    </div>
  )

  renderBookDetailsView = () => (
    <div className="container-one">
      <div className="main-container1">
        <div className="description">
          <h1 className="home-heading">Find Your Next Favorite Books?</h1>
          <p className="home-pera">
            You are in the right place. Tell us what titles or genres you have
            enjoyed in the past, and we will give you surprisingly insightful
            recommendations.
          </p>
        </div>
        <div className="container2">
          <div className="home-slide-container">
            <h1 className="home-heading2">Top Rated Books</h1>
            <Link to="/books">
              <button type="button" className="button">
                FindBooks
              </button>
            </Link>
          </div>
          <div className="sliding-component">{this.renderTopRatedBooks()}</div>
        </div>
        <div className="contact-us">
          <img src="https://res.cloudinary.com/djdh5bkl5/image/upload/v1644811705/miniproject/Group_7395_zio5xw.png" />
          <p>Contact us</p>
        </div>
      </div>
    </div>
  )

  renderFailureView = () => (
    <div className="jobs-error-view-container">
      <img
        src="https://res.cloudinary.com/djdh5bkl5/image/upload/v1644851636/miniproject/Group_7522_bethic.jpg"
        alt="failure view"
        className="jobs-failure-img"
      />

      <p className="jobs-failure-description">
        Something Went Wrong,Please try again
      </p>
      <button
        type="button"
        testid="button"
        className="jobs-failure-button"
        onClick={this.fetchBookDetails()}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height="50" width="50" />
    </div>
  )

  renderBookDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderBookDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div>{this.renderBookDetails()}</div>
      </>
    )
  }
}
export default Home
