import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-header">
      <div className="nav-content">
        <div className="nav-logo-container">
          <Link to="/">
            <img
              className="website-logo"
              src="https://res.cloudinary.com/djdh5bkl5/image/upload/v1644799340/Group_7732_ixqanv.png"
              alt="website logo"
            />
          </Link>

          <ul className="nav-icons-container">
            <Link to="/" className="list-item">
              <li>Home</li>
            </Link>

            <Link to="/books" className="list-item">
              <li>BookShelves</li>
            </Link>
          </ul>
          <button type="button" className="nav-btn" onClick={onClickLogout}>
            LogOut
          </button>
          <button>
            <img
              className="hamberger"
              src="https://res.cloudinary.com/djdh5bkl5/image/upload/v1644799435/menu_owku8j.png"
            />
          </button>
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Header)
