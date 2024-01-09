// Card.js

import React from 'react';

const Card = ({ card, onDelete, onEdit, onMoveNext, onMoveBack, currentBox }) => {
  return (
    <div className="mb-2 p-2 bg-white rounded border">



      <p className="mb-2">{card.text}</p>
      <div className="flex justify-between">
        <div>
          <button
            onClick={() => onEdit(card.id)}
            className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600 mr-2"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(card.id)}
            className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
          >
            Delete




          </button>
        </div>
        <div>
          <button
            onClick={() => onMoveBack(card.id)}
            disabled={card.box === 1}
            className="bg-gray-300 text-gray-700 py-1 px-2 rounded cursor-pointer mr-2"
          >
            Back
          </button>




          <button
            onClick={() => onMoveNext(card.id)}
            disabled={card.box === 4}
            className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600 cursor-pointer"
          >
            Next
          </button>


          
        </div>
      </div>
    </div>
  );
};

export default Card;
