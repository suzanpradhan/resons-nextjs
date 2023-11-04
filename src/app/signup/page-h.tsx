export default function SignUp() {
  return (
    <div className="items">
      <div className="item">
        <div className="left">
          <div className="logo-holder">
            <img src="/images/logo_on_light.png" alt="logo-here" />
          </div>
          <div className="qr-holder">
            <img src="./" alt="qr-here" />
          </div>
          <p className="title-sm">Ticket ID</p>
        </div>
        <div className="right">
          <h3>Naresh Surya Classic NEpal 2023</h3>
          <div className="details">
            <span>Date: 17 Aug 2023</span>
            <span>Ticket Type: Normal</span>
          </div>
          <p className="copyright">
            {/* Evolve: Nepal first Fitness & Lifestyle App */}
          </p>
        </div>
      </div>
    </div>
  );
}
