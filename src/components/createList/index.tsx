import { useState } from 'react';

interface Props {
  addNewList: (newList: ShoppingList) => void;
  navigateToListsView: () => void;
}

interface ListItem {
  name: string;
  amount: string;
}

interface ShoppingList {
  name: string;
  items: ListItem[];
}

export const CreateList = ({
  addNewList,
  navigateToListsView,
}: Props): JSX.Element => {
  const [name, setName] = useState<string>('');

  const handleCreateList = (): void => {
    const newList: ShoppingList = {
      name: name.trim(),
      items: [],
    };

    if (newList.name !== '') {
      addNewList(newList);
      navigateToListsView();
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
