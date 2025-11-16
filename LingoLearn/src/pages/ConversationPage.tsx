// import { useState, useRef, useEffect } from 'react';
// import type { Selection, Message } from '../types';
// import FeedbackPanel from '../components/FeedbackPanel';
import { useState } from 'react'
import { GenerateContentResponse, GoogleGenAI} from "@google/genai";

interface languageResponse {
  "ai_reply": string,
  "corrections": string[],
  "feedback": string,
  "english_translation": string
}

// interface ConversationPageProps {
//   selection: Selection;
//   onEnd: () => void;
// }

function ConversationPage() {
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
    <>
      <h1>Lingo Learn!</h1>

      <p>Write something in Spanish : </p>
      <input type="text"  id="myInput" placeholder="" onChange={(e) => setInputText(e.target.value)}></input>
      <br></br>
      <button onClick={generateResponse}>Generate Response</button>
      <p>{apiResponse.ai_reply}</p>
    </>
  )

}

// function ConversationPage({ selection, onEnd }: ConversationPageProps) {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [isListening, setIsListening] = useState(false);
//   const [showTranscript, setShowTranscript] = useState(false);
//   const chatContainerRef = useRef<HTMLDivElement>(null);

//   // Auto-scroll to bottom when messages change
//   useEffect(() => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
//     }
//   }, [messages]);

//   // Initialize conversation with a prompt
//   useEffect(() => {
//     const initialPrompt = getScenarioPrompt();
//     setMessages([
//       {
//         role: 'assistant',
//         content: initialPrompt,
//       },
//     ]);
//   }, []);

//   const getScenarioPrompt = () => {
//     const scenarios: Record<string, string> = {
//       taxi: 'You are in a taxi. The driver looks at you through the rearview mirror...',
//       restaurant: 'You are seated at a restaurant. The waiter approaches your table...',
//       housing: 'You approach a hostel reception desk. The clerk greets you...',
//     };
//     return scenarios[selection.scenario || 'taxi'] || 'Start the conversation...';
//   };

//   const handleStartTalking = async () => {
//     setIsListening(true);
    
//     // Simulate voice input and API response
//     setTimeout(() => {
//       const userMessage: Message = {
//         role: 'user',
//         content: '[What you just said]',
//       };
      
//       const assistantMessage: Message = {
//         role: 'assistant',
//         content: '[GEMINI response]',
//         feedback: [
//           'Good pronunciation of "hello"',
//           'Consider using more formal greeting',
//           'Try to speak more slowly',
//         ],
//       };
      
//       setMessages((prev) => [...prev, userMessage, assistantMessage]);
//       setIsListening(false);
//     }, 2000);
//   };

//   const handleEndConversation = () => {
//     if (confirm('Are you sure you want to end the conversation?')) {
//       onEnd();
//     }
//   };

//   return (
//     <div className="h-screen flex flex-col bg-[#FFF8F0]">
//       {/* Chat Area - Scrollable */}
//       <div
//         ref={chatContainerRef}
//         className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4"
//       >
//         {/* Scenario Prompt */}
//         <div className="bg-[#FF9933] text-white rounded-lg sm:rounded-xl p-4 sm:p-6 max-w-3xl mx-auto">
//           <p className="text-sm sm:text-base md:text-lg">
//             [Prompt related text for you to start talking about]
//           </p>
//         </div>

//         {/* Messages */}
//         {messages.map((message, index) => (
//           <div key={index} className="max-w-3xl mx-auto space-y-3">
//             {message.role === 'user' && (
//               <div className="bg-[#FF9933] text-white rounded-lg sm:rounded-xl p-4 sm:p-6">
//                 <p className="text-sm sm:text-base md:text-lg">{message.content}</p>
//               </div>
//             )}
            
//             {message.role === 'assistant' && (
//               <>
//                 <div className="bg-[#5DBBBB] text-white rounded-lg sm:rounded-xl p-4 sm:p-6">
//                   <p className="text-sm sm:text-base md:text-lg">{message.content}</p>
//                 </div>
//                 {message.feedback && message.feedback.length > 0 && (
//                   <FeedbackPanel feedbackItems={message.feedback} />
//                 )}
//               </>
//             )}
//           </div>
//         ))}

//         {/* Start Talking Button */}
//         {!isListening && (
//           <div className="max-w-3xl mx-auto flex justify-end">
//             <button
//               onClick={handleStartTalking}
//               className="bg-[#FF9933] hover:bg-[#FF8820] text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg sm:rounded-xl text-base sm:text-lg transition-colors"
//             >
//               Start Talking
//             </button>
//           </div>
//         )}

//         {isListening && (
//           <div className="max-w-3xl mx-auto text-center">
//             <p className="text-gray-600 text-sm sm:text-base animate-pulse">Listening...</p>
//           </div>
//         )}
//       </div>

//       {/* Bottom Bar */}
//       <div className="bg-[#FF9933] p-4 sm:p-6 flex flex-wrap items-center justify-between gap-3 sm:gap-4">
//         <button
//           onClick={handleEndConversation}
//           className="bg-[#FF6B00] hover:bg-[#E55F00] text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-lg text-sm sm:text-base transition-colors"
//         >
//           End Convo.
//         </button>
//         <button
//           onClick={() => setShowTranscript(!showTranscript)}
//           className="bg-[#5DBBBB] hover:bg-[#4DA9A9] text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-lg text-sm sm:text-base transition-colors"
//         >
//           {showTranscript ? 'Hide' : 'Show'} Transcript
//         </button>
//       </div>

//       {/* Transcript Modal */}
//       {showTranscript && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-xl sm:text-2xl font-bold">Conversation Transcript</h3>
//               <button
//                 onClick={() => setShowTranscript(false)}
//                 className="text-gray-500 hover:text-gray-700 text-2xl"
//               >
//                 ×
//               </button>
//             </div>
//             <div className="space-y-3">
//               {messages.map((message, index) => (
//                 <div key={index} className="border-b pb-3">
//                   <p className="font-semibold text-sm text-gray-600 mb-1">
//                     {message.role === 'user' ? 'You' : 'Assistant'}:
//                   </p>
//                   <p className="text-sm sm:text-base">{message.content}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

export default ConversationPage;