import { useState } from 'react'
import './App.css'
import { GenerateContentResponse, GoogleGenAI} from "@google/genai";

interface languageResponse {
  "ai_reply": string,
  "corrections": string[],
  "feedback": string,
  "english_translation": string
}

function App() {

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

export default App
