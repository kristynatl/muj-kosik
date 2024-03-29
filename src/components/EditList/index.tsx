import { useState } from 'react';
// import { ShoppingList } from '../../types';

interface Props {
  navigateToListsView: () => void;
}

export const EditList = ({ navigateToListsView }: Props) => {
  const [name, setName] = useState('');

  const handleEditList = () => {
    const newList = name.trim();
    if (newList) {
      console.log(newList);
    }
  };

  return (
    <>
      <p>
        <span className="navigate" onClick={navigateToListsView}>
          Nákupní seznamy
        </span>{' '}
        &gt; Úprava seznamu "{name}"
      </p>
      <h2>Úprava seznamu</h2>
      <label>
        Název:{' '}
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </label>
      <button onClick={handleEditList}>Upravit</button>
    </>
  );
};
