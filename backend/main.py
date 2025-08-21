import uvicorn
from fastapi import FastAPI, HTTPException,Path
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import  Optional
from data.flashcarddata import flashcards
app = FastAPI()


origins = [
        "http://localhost:5173"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers=["*"],
)

class Card(BaseModel):
    word: str
    meaning: str
    example: str
    cultural_context: str
    image: str
    difficulty: str

@app.get('/api/cards/')

def get_all_cards():
    return {"cards":list(flashcards.values())}

@app.get('/api/cards/{flashcard_id}', response_model=Card)

def get_all_cards(flashcard_id: int  = Path(description="Card Id")):
    return flashcards[flashcard_id]



@app.get("/api/words/{word}")

def get_card_by_word(word:str):
    for flashcard_id in flashcards:
        if flashcards[flashcard_id]["word"].lower() == word.lower():
            return flashcards[flashcard_id]
        
    raise HTTPException(status_code=404,detail="Card not found")
        

@app.get("/api/get-card-by-difficulty/")

def get_card_bydifficulty(flashcard_id: int ,difficulty:Optional[str]=None):
    results = []
    if difficulty:
        for  flashcard_id in flashcards:
            if flashcards[flashcard_id]["difficulty"].lower() == difficulty.lower():
                results.append(flashcards[flashcard_id])
        return results
         
    return {"Error":"You can do it!"}


if __name__ == "__main__":
    uvicorn.run(app,host="0.0.0.0", port=8000)

