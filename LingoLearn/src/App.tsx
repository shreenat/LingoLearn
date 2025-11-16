import { useState } from 'react'
import './App.css'
import { GenerateContentResponse, GoogleGenAI } from "@google/genai";


function App() {
  //const [count, setCount] = useState(0)

  const [apiResponse, setApiResponse] = useState<string>("");
  // The client gets the API key from the environment variable `GEMINI_API_KEY`.
  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY
  });

  async function generateResponse() {
    const response : GenerateContentResponse= await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Explain how AI works in a few words",
    });
      const output = await response.text
      if (output != undefined) {
        setApiResponse(output);
      } else {
        console.log("No response from API");
      }

    
    //console.log(response.text);
  }
  
  return (
    <>
      <h1>Lingo Learn!</h1>
      <button onClick={generateResponse}>Generate Response</button>
      <p>{apiResponse}</p>
    </>
  )
}

export default App
