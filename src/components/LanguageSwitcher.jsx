import { useLanguage } from '../i18n/LanguageContext'

function LanguageSwitcher() {
  const { language, changeLanguage } = useLanguage()

  return (
    <div className="language-switcher">
      <button
        className={`lang-btn ${language === 'en' ? 'active' : ''}`}
        onClick={() => changeLanguage('en')}
        aria-label="Switch to English"
      >
        EN
      </button>
      <span className="lang-separator">|</span>
      <button
        className={`lang-btn ${language === 'ar' ? 'active' : ''}`}
        onClick={() => changeLanguage('ar')}
        aria-label="Switch to Arabic"
      >
        AR
      </button>
    </div>
  )
}

export default LanguageSwitcher
