//import { useState, useRef, useEffect } from 'react';
//import type { Selection, Message } from '../types';
//import FeedbackPanel from '../components/FeedbackPanel';
import { useState } from 'react'
import { GenerateContentResponse, GoogleGenAI} from "@google/genai";
import './ConversationPage.css';

interface languageResponse {
  "ai_reply": string,
  "corrections": string[],
  "feedback": string,
  "english_translation": string
}

interface ConversationPageProps {
  selection: Selection;
  onEnd: () => void;
}

function ConversationPage({ selection, onEnd }: ConversationPageProps) {
  // const [messages, setMessages] = useState<Message[]>([]);
  // const [isListening, setIsListening] = useState(false);
  // const [showTranscript, setShowTranscript] = useState(false);
  // const chatContainerRef = useRef<HTMLDivElement>(null);

  // // Auto-scroll to bottom when messages change
  // useEffect(() => {
  //   if (chatContainerRef.current) {
  //     chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  //   }
  // }, [messages]);

  // // Initialize conversation with a prompt
  // useEffect(() => {
  //   const initialPrompt = getScenarioPrompt();
  //   setMessages([
  //     {
  //       role: 'assistant',
  //       content: initialPrompt,
  //     },
  //   ]);
  // }, []);

  // const getScenarioPrompt = () => {
  //   const scenarios: Record<string, string> = {
  //     taxi: 'You are in a taxi. The driver looks at you through the rearview mirror...',
  //     restaurant: 'You are seated at a restaurant. The waiter approaches your table...',
  //     housing: 'You approach a hostel reception desk. The clerk greets you...',
  //   };
  //   return scenarios[selection.scenario || 'taxi'] || 'Start the conversation...';
  // };

  // const handleStartTalking = async () => {
  //   setIsListening(true);
    
  //   // Simulate voice input and API response
  //   setTimeout(() => {
  //     const userMessage: Message = {
  //       role: 'user',
  //       content: '[What you just said]',
  //     };
      
  //     const assistantMessage: Message = {
  //       role: 'assistant',
  //       content: '[GEMINI response]',
  //       feedback: [
  //         'Good pronunciation of "hello"',
  //         'Consider using more formal greeting',
  //         'Try to speak more slowly',
  //       ],
  //     };
      
  //     setMessages((prev) => [...prev, userMessage, assistantMessage]);
  //     setIsListening(false);
  //   }, 2000);
  // };

  // const handleEndConversation = () => {
  //   if (confirm('Are you sure you want to end the conversation?')) {
  //     onEnd();
  //   }
  // };

  
  const [inputText, setInputText] = useState<string>("");

  const [apiResponse, setApiResponse] = useState<languageResponse>({ai_reply: "", corrections: [], feedback: "", english_translation: ""});
  // const [apiResponse, setApiResponse] = useState<string>("");
  // The client gets the API key from the environment variable `GEMINI_API_KEY`.
  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY
  });
  const language = "Spanish";
  const learningLevel = "beginner";
  const scenario = "restaurant";

  async function generateResponse() {
    try {
      const response : GenerateContentResponse= await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `You are a ${language} learning partner for a ${learningLevel} student. 
          The user said ${inputText}. Remember that you are in a ${scenario} scenario.

          Here is the description of the levels : 
          - Beginner: Has a basic understanding of common phrases and expressions upto around 5th grade level. Can communicate necessary needs.
          - Intermediate: Can handle everyday conversations, some slang and formal language used.   
          - Advanced: Can understand slang and formal language like a native speaker. Can grasp implicit meanings and cultural references.

          Give a response that does the following :
          1. Reply in ONLY the target language (${language}) in the same level as the user.
          2. Correct any grammar mistakes the user made in English.
          3. Provide brief feedback in English if there are any corrections. Otherwise say "No corrections. Good job!"
          4. Continue the scenario naturally in ${language}.
          5. Keep messages short.

          Return a JSON object EXACTLY in this structure from the first '{' to the '}':
          {
            "ai_reply": string,
            "corrections": string[],
            "feedback": string,
            "english_translation": string
          }`,
      });
      let output = await response.text;
      if (output != undefined) {
        // It is returning the json object as a code block ``` ``` with json type in the front
        output = output.replace(/```json|```/g, '').trim();
        // matches and replaces global occurrences of ```json OR ```
        setApiResponse(JSON.parse(output));
        console.log("API Response:", apiResponse);
      } else {
        console.log("No response from API");
      }
    } catch (error) {
      console.error("Error generating content:", error);
    }    
  }

  return (
    <section>
      <h2 className='prompt'>You are at a restaurant. Greet the waiter and give your order.</h2>
      <div className="container">
        <div className="dialogue-box">
        <input type="text" id="myInput" placeholder="Say something in Spanish" onChange={(e) => setInputText(e.target.value)}></input>
        </div>


        <div className="feedback-box">
        <p>{apiResponse.feedback}</p>
        </div>


        <div className="response-box">
        <p>{apiResponse.ai_reply}</p>
        </div>
      </div>

      <button id="start-talking-button" onClick={generateResponse}>Start Talking</button>
    </section>
  )
}

export default ConversationPage;