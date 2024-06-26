import React, { useState } from 'react';

const datas = {
  strawberry: 'The garden strawberry (or simply strawberry /ˈstrɔːbᵊri/; Fragaria × ananassa) is a widely grown hybrid species of the genus Fragaria (collectively known as the strawberries)',
  banana: 'A banana is an edible fruit, botanically a berry, produced by several kinds of large herbaceous flowering plants in the genus Musa.',
  apple: 'The apple tree (Malus domestica) is a deciduous tree in the rose family best known for its sweet, pomaceous fruit, the apple. It is cultivated worldwide as a fruit tree, and is the most widely grown species in the genus Malus.',
  orange: 'The orange (specifically, the sweet orange) is the fruit of the citrus species Citrus × sinensis in the family Rutaceae.'
};

const Slider = () => {
  const [selectedItem, setSelectedItem] = useState('item-1');

  const handleChange = (event) => {
    setSelectedItem(event.target.id);
  };

  return (
    <div className={`containerr ${selectedItem}`}>
      <input
        type="radio"
        name="slider"
        id="item-1"
        checked={selectedItem === 'item-1'}
        onChange={handleChange}
      />
      <input
        type="radio"
        name="slider"
        id="item-2"
        checked={selectedItem === 'item-2'}
        onChange={handleChange}
      />
      <input
        type="radio"
        name="slider"
        id="item-3"
        checked={selectedItem === 'item-3'}
        onChange={handleChange}
      />

      <div className="cards">
        <label className="card" htmlFor="item-1" id="song-1">
          <img src="https://images.unsplash.com/photo-1530651788726-1dbf58eeef1f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=882&q=80" alt="song" />
        </label>
        <label className="card" htmlFor="item-2" id="song-2">
          <img src="https://images.unsplash.com/photo-1559386484-97dfc0e15539?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1234&q=80" alt="song" />
        </label>
        <label className="card" htmlFor="item-3" id="song-3">
          <img src="https://images.unsplash.com/photo-1533461502717-83546f485d24?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60" alt="song" />
        </label>
      </div>
    </div>
  );
};

export default Slider;
