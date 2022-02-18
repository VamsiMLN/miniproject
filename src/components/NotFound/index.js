import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const NotFound = () => (
  <>
    <Header />
    <div className="not-found-container">
      <img
        className="notfound-image"
        alt="not found"
        src="https://res.cloudinary.com/djdh5bkl5/image/upload/v1644934943/Group_7484_ifkgir.png"
      />
      <h1 className="notfound-heading">Page Not Found</h1>
      <p className="notfound-pera">
        we are sorry, the page you requested could not be found
      </p>
      <Link to="/">
        <button className="button1" type="button">
          Go Back to Home
        </button>
      </Link>
    </div>
  </>
)
export default NotFound
