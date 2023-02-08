import './index.css'

const LanguageFilterItem = props => {
  const {languageDetails, onClickButton, selectedButtonId} = props
  const {id, language} = languageDetails

  const onClickTab = () => {
    onClickButton(id)
  }

  const selectedClassname = selectedButtonId === id ? 'selected-tab-item' : ''

  return (
    <li className="tab-item">
      <button
        onClick={onClickTab}
        type="button"
        className={`language-btn ${selectedClassname}`}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
