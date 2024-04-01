import { useState } from 'react';
import { ShoppingList } from '../../types';

interface Props {
  list: ShoppingList;
  navigateToListsView: () => void;
  updateList: (updatedList: ShoppingList, index: number) => void;
  index: number;
}

export const EditList = ({
  navigateToListsView,
  list,
  updateList,
  index,
}: Props) => {
  const [name, setName] = useState<string>(list.name);

  const handleNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setName(event.target.value);
  };

  const handleSaveList = (list: ShoppingList): void => {
    const updatedList: ShoppingList = {
      id: list.id,
      name: name.trim(),
      items: list.items,
    };
    if (updatedList.name !== '') {
      updateList(updatedList, index);
      navigateToListsView();
    }
  };

  return (
    <>
      <p>
        <span className="navigate" onClick={navigateToListsView}>
          Nákupní seznamy
        </span>{' '}
        &gt; Úprava seznamu
      </p>
      <h2>Úprava seznamu "{name}"</h2>
      <label>
        Název: <input value={name} onChange={handleNameChange} />
      </label>
      <button className="btn-delete" onClick={() => handleSaveList(list)}>
        Upravit
      </button>
    </>
  );
};
