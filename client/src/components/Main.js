import '../assets/styles/Main.css';

function Main() {
  return (
    <div className='homepage'>
      <div className='homepage-context'>
        <h1>
          Find the perfect <span>roommate today!</span>
        </h1>
        <p>
          Tell us what you are looking for and we will match
          <span>you with the roommate with similar habits as you.</span>
        </p>
        <button>Get Started!</button>
      </div>
      <div className='homepage-image'>
        <img src={require('../assets/images/roommates.png')} alt='roommates' />
      </div>
    </div>
  );
}

export default Main;
