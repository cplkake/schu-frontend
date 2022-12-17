import './footer.css';

export default function Footer() {
  return (
    <footer>
      <div className="footerLeft">
        <div className="footerLogo">SCHU</div>
      </div>
      <div className="footerRight">
        <div className="socialMediaContainer">
          <h4>Follow Us</h4>
          <a href="http://instagram.com">
            <img src={require('../../images/instagram.svg').default} alt="" />
          </a>
          <a href="http://facebook.com">
            <img src={require('../../images/facebook.svg').default} alt="" />
          </a>
        </div>
      </div>
    </footer>
  )
}