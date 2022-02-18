import {BsSearch} from 'react-icons/bs'

import './index.css'

const FiltersGroup = props => {
  const onChangeSearchInput = event => {
    const {changeSearchInput} = props
    changeSearchInput(event)
  }

  const onEnterSearchInput = event => {
    const {getbooksList} = props
    if (event.key === 'Enter') {
      getbooksList()
    }
  }

  const renderSearchInput = () => {
    const {getbooksList, searchInput} = props
    return (
      <div className="search-input-container">
        <input
          type="search"
          className="search-input"
          placeholder="Search"
          value={searchInput}
          onChange={onChangeSearchInput}
          onKeyDown={onEnterSearchInput}
        />
        <button
          type="button"
          testid="searchButton"
          className="search-button-container"
          onClick={getbooksList}
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  return <div className="filters-group-container">{renderSearchInput()}</div>
}
export default FiltersGroup
