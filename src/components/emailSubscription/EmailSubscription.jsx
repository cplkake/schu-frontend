import './emailSubscription.css';

export default function EmailSubscription() {
  const handleClick = () => alert('I can be interacted with...I can communicate with you...am I a real e-commerce site?');

  return (
    <section className="emailSubscriptionSection">
      <h3>Be the first to know</h3>
      <p>Sign up to our mailing list to get the latest on upcoming releases, sales and more</p>
      <div className="emailInputContainer">
        <input type="email" />
        <button onClick={handleClick}>Subscribe</button>
      </div>
    </section>
  )
}