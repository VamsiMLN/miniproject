import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './index.css'

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
}

const TopratedBooks = props => {
  const {details} = props
  const {coverPic, title, authorName} = details

  return (
    <div className="slider-container">
      <h3 className="book-heading">Top Rated Books</h3>
      <Slider {...settings} className="slider">
        <img className="books" alt="" src={coverPic} />
        <h2 className="title">{title}</h2>
      </Slider>
    </div>
  )
}
export default TopratedBooks
