import './SelectionPage.css';
import type { Selection, Language, Difficulty, Scenario } from '../types';
//import LanguageCard from '../components/LanguageCard';
//import DifficultyCard from '../components/DifficultyCard';
//import ScenarioCard from '../components/ScenarioCard';

interface SelectionPageProps {
  selection: Selection;
  setSelection: (selection: Selection) => void;
  onNext: () => void;
}

function SelectionPage({ selection, setSelection, onNext }: SelectionPageProps) {
//   const languages: { key: Language; label: string }[] = [
//     { key: 'spanish', label: 'Spanish' },
//     { key: 'french', label: 'French' },
//     { key: 'german', label: 'German' },
//     { key: 'thai', label: 'Thai' },
//     { key: 'hindi', label: 'Hindi' },
//     { key: 'mandarin', label: 'Mandarin' },
//   ];

//   const difficulties: { key: Difficulty; label: string; description: string }[] = [
//     { key: 'beginner', label: 'Beginner', description: 'If you understand basic vocabulary but not much past that.' },
//     { key: 'intermediate', label: 'Intermediate', description: 'If you have a good grasp of the language but not at a native-level.' },
//     { key: 'advanced', label: 'Advanced', description: 'If you are basically a native speaker and know slang and formal vocab.' },
//   ];

//   const scenarios: { key: Scenario; label: string; description: string }[] = [
//     { key: 'taxi', label: 'Taxi Awkwardness', description: 'You introduce yourself to your taxi driver to break the silence...' },
//     { key: 'restaurant', label: 'Hungry & Alone', description: 'You order a meal at a restaurant and chaos ensues...' },
//     { key: 'housing', label: 'Cold & Stranded in a City', description: 'You were left behind by your friends in a city and must find housing...' },
//   ];

//   const canProceed = selection.language && selection.difficulty && selection.scenario;

  return (
    // <div>
    //   {/* Select Language (all lead to spanish rn) */}
    //   {/* Select Difficulty */}
    //   {/* Select Scenario */}
    //   {/* Next button (only go forward once something selected for each section) */}
    // </div>
  <div className='selection'>
    {/* <div className="radio-group">
    <label className="radio-option">
      <input type="radio" name="lang" value="english"></input>
      <span className="custom-radio"></span>
      English
    </label>

    <label className="radio-option">
      <input type="radio" name="lang" value="spanish"> </input>
      <span className="custom-radio"></span>
      Spanish
    </label>

    <label className="radio-option">
      <input type="radio" name="lang" value="french"></input>
      <span className="custom-radio"></span>
      French
    </label>
    </div> */}
    <button className='next-button' onClick={onNext}>NEXT</button>
  </div>
  
  );
}

export default SelectionPage;