import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faGoogle, faGithub} from '@fortawesome/free-brands-svg-icons'
import '../../css/components/auth/socialLinks.scss'

function SocialLinks() {
  return (
    <div className="social-container">
      <div className="social-link">
        <p>or continue with these social profile</p>
        <div className="social-logos">
          <FontAwesomeIcon icon={faFacebook} />
          <FontAwesomeIcon icon={faInstagram} />
          <FontAwesomeIcon icon={faGoogle} />
          <FontAwesomeIcon icon={faGithub} />
        </div>
      </div>
    </div>
  )
}

export default SocialLinks
