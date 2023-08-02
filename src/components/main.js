function Main() {
  return (
    <div className='Homepage'>
      <div className=''>
        <h1>find the perfect roommate today!</h1>
        <p>
          tell us what you are looking for and we will match you with the
          roommate with similar habits as you.
        </p>
        <button>get started!</button>
      </div>
      <div className=''>
        <img src={require('../styles/roommates.png')} alt="roommates" />
      </div>       
    </div>
  );
}

export default Main;
