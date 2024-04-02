import React, {useState} from 'react'


export default function TDDButton() {
  const [buttonText, setButtonText] = useState("Hello world")

  return <button class="tablet-view" onClick={()=> setButtonText("bye world")} data-testid="tdd-button">{buttonText}</button>
}
