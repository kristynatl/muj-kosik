import { useState } from 'react';
import { ShoppingList } from '../../types';

interface Props {
  addNewList: (newList: ShoppingList) => void;
  navigateToListsView: () => void;
  currentLists: ShoppingList[];
}

export const CreateList = ({
  addNewList,
  navigateToListsView,
  currentLists,
}: Props): JSX.Element => {
  const [name, setName] = useState<string>('');

  const handleCreateList = (): void => {
    const newList: ShoppingList = {
      id: currentLists.length + 1,
      name: name.trim(),
      items: [],
    };

    if (newList.name !== '') {
      addNewList(newList);
      navigateToListsView();
      console.log(newList.id);
    }
  };

  return (
    <>
      <p>
        <span className="navigate" onClick={navigateToListsView}>
          Nákupní seznamy
        </span>{' '}
        &gt; Vytvoření nového seznamu
      </p>
      <h2>Vytvoření nového seznamu</h2>
      <label>
        Název:{' '}
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </label>
      <button onClick={handleCreateList}>Vytvořit</button>
    </>
  );
};
