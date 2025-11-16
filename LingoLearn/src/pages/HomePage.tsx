import './HomePage.css';
//import SelectionPage  from './SelectionPage';
import logo from '../assets/logo.png';
import monkey_img from '../assets/monkey.png';
//import { Link } from 'react-router-dom';

interface HomePageProps {
  onStart: () => void;
}

function HomePage({ onStart }: HomePageProps) {

  return (
    <div>

      {/* TITLE CARD */}
      <div className="title-card">
          LINGOLEARN
          <img src={logo} alt="logo" className='logo'></img>
      </div>

      <div style={{ height: '5vh' }}></div>

      {/* INFO CARD + START BUTTON */}
      <div className='container'>
        <div className="body-card">
          <h1>
            LEARN A LANGUAGE THROUGH CONVERSATION
          </h1>
          <p className='body-card-text'>
            Roleplay conversations in various scenarios and get live feedback on your grammar, vocabulary, and accent!
          </p>
        </div>
        <div className='monkeyImage'>
          <img src={monkey_img} alt="...monkey..."></img>
        </div>
      </div>

      <button className='start-button inter-bold' onClick={onStart}>
        START NOW!
      </button>
      
    </div>
  );
}

export default HomePage;