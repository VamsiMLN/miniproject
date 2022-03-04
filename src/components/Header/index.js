import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FaBars} from 'react-icons/fa'
import {AiFillCloseCircle} from 'react-icons/ai'
import './index.css'

class Header extends Component {
  state = {buttonClicked: false}

  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  onClickButton = () => {
    this.setState(prevState => ({buttonClicked: !prevState.buttonClicked}))
  }

  dropDownOptions = () => (
    <ul className="dropDown-container">
      <li className="nav-menu-item">
        <Link to="/" className="list-El">
          Home
        </Link>
      </li>
      <li className="nav-menu-item">
        <Link to="/shelf" className="list-El">
          Bookshelves
        </Link>
      </li>
      <button className="button-one" type="button" onClick={this.onClickLogout}>
        Logout
      </button>
      <button
        type="button"
        className="close-button"
        onClick={this.onClickButton}
      >
        <AiFillCloseCircle className="close-logo" />
      </button>
    </ul>
  )

  render() {
    const {buttonClicked} = this.state
    console.log(buttonClicked)
    return (
      <nav className="nav-header">
        <div className="nav-drop">
          <div className="nav-mobile-container">
            <Link to="/">
              <img
                className="image"
                alt="website logo"
                src="https://res.cloudinary.com/djdh5bkl5/image/upload/v1644756086/miniproject/Group_7732_1_w8t4xh.jpg"
              />
            </Link>
            <button
              className="button-one"
              type="button"
              onClick={this.onClickButton}
            >
              <FaBars className="nav-bars" />
            </button>
          </div>
          <div className="dropdown">
            {buttonClicked && this.dropDownOptions()}
          </div>
        </div>
        <div className="nav-desktop-container ">
          <Link to="/">
            <img
              className="logo-desktop"
              alt="website logo"
              src="https://res.cloudinary.com/djdh5bkl5/image/upload/v1644728795/miniproject/Group_7732_w2revh.jpg"
            />
          </Link>
          <ul className="un-order-list">
            <li>
              <Link to="/" className="list-El">
                Home
              </Link>
            </li>
            <li>
              <Link to="/shelf" className="list-El">
                Bookshelves
              </Link>
            </li>
            <button
              className="desktop-button"
              type="button"
              onClick={this.onClickLogout}
            >
              Logout
            </button>
          </ul>
        </div>
      </nav>
    )
  }
}
export default withRouter(Header)
