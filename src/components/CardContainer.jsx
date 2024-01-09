import React, { useState, useEffect } from 'react';

import Card from './Card';
import toast, { Toaster } from 'react-pop-toast';

const CardContainer = () => {
  const [boxes, setBoxes] = useState(Array.from({ length: 4 }, (_, index) => index + 1));
  const [cards, setCards] = useState(() => {
    const storedCards = JSON.parse(localStorage.getItem('cards')) || {};
    return storedCards;
  });
  const [currentBox, setCurrentBox] = useState(1);
  const [newCardText, setNewCardText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedCardId, setEditedCardId] = useState(null);

  useEffect(() => {
    const storedCards = JSON.parse(localStorage.getItem('cards')) || {};
    setCards(storedCards);
  }, []);

  useEffect(() => {
    localStorage.setItem('cards', JSON.stringify(cards));
  }, [cards]);

  const handleAddCard = () => {
    if (newCardText.trim() !== '') {
      if (isEditing && editedCardId) {
        setCards((prevCards) => ({
          ...prevCards,
          [editedCardId]: { text: newCardText, box: currentBox },
        }));
        setIsEditing(false);
        setEditedCardId(null);
        toast.success('Card edited successfully!');
      } else {
        const newCardId = Date.now().toString();
        setCards((prevCards) => ({
          ...prevCards,
          [newCardId]: { text: newCardText, box: currentBox },
        }));
        toast.success('Card added successfully!');
      }
      setNewCardText('');
    } else {
      toast.error('Card text cannot be empty!');
    }
  };

  const handleDeleteCard = (id) => {
    const updatedCards = { ...cards };
    delete updatedCards[id];
    setCards(updatedCards);
    toast.success('Card deleted successfully!');
  };

  const handleEditCard = (id) => {
    const cardToEdit = cards[id];
    if (cardToEdit) {
      setNewCardText(cardToEdit.text);
      setIsEditing(true);
      setEditedCardId(id);
      setCurrentBox(cardToEdit.box);
    }
  };

  const handleMoveNext = (id) => {
    const updatedCards = { ...cards };
    if (updatedCards[id].box < 4) {
      const currentCard = updatedCards[id].text;
      const currentBox = updatedCards[id].box;
      updatedCards[id].box += 1;
      setCards(updatedCards);
      toast.success(`Card "${currentCard}" moved to Box ${currentBox + 1}!`);
    }
  };
  
  const handleMoveBack = (id) => {
    const updatedCards = { ...cards };
    if (updatedCards[id].box > 1) {
      const currentCard = updatedCards[id].text;
      const currentBox = updatedCards[id].box;
      updatedCards[id].box -= 1;
      setCards(updatedCards);
      toast.success(`Card "${currentCard}" moved to Box ${currentBox - 1}!`);
    }
  };

  return (
    <>
      <Toaster />
      <div className="bg-white rounded mt-10">
        <div className='flex justify-center'>
        
          <div className=''>
          <input
            type="text"
            placeholder="Card Text"
            required
            value={newCardText}
            onChange={(e) => setNewCardText(e.target.value)}
            className=" p-2 mb-4 border rounded w-96 mr-2"
          />
            <button
              onClick={handleAddCard}
              className={`bg-${isEditing ? 'blue' : 'green'}-500 text-white py-2 px-4 rounded hover:bg-${isEditing ? 'blue' : 'green'
                }-600 `}
            >
              {isEditing ? 'Edit Card' : 'Add Card'}
            </button>
          </div>
        </div>
      </div>
      <div className="boxes mt-4  flex flex-wrap gap-4 w-full justify-center">
        {boxes.map((box) => (
          <div
            key={box}
            className={`box bg-gray-400 p-4 rounded shadow-md w-[300px] min-h-[300px]`}
          >
            <h3 className="text-lg font-semibold mb-2">Box {box}</h3>
            {Object.entries(cards || {})
              .filter(([_, card]) => card.box === box)
              .map(([id, card]) => (
                <Card
                  key={id}
                  card={{ id, ...card }}
                  onDelete={handleDeleteCard}
                  onEdit={handleEditCard}
                  onMoveNext={() => handleMoveNext(id)}
                  onMoveBack={() => handleMoveBack(id)}
                  currentBox={currentBox}
                />
              ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default CardContainer;
