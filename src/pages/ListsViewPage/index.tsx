import { useState } from 'react';
// import { Link } from 'react-router-dom';
import { CreateList } from '../../components/CreateList';
import { ShoppingList } from '../../types';
import { EditList } from '../../components/EditList';

const initialLists: ShoppingList[] = [
  {
    name: 'Velikonoční nákup',
    items: [
      { name: 'Vajíčka', amount: '10 ks' },
      { name: 'Mouka', amount: '1 kg' },
    ],
  },
  {
    name: 'Nákup na chatu',
    items: [
      { name: 'Pivo', amount: '6 ks' },
      { name: 'Grilovací maso', amount: '2 kg' },
    ],
  },
  {
    name: 'Drogerie',
    items: [
      { name: 'Šampon', amount: '1 ks' },
      { name: 'Toaletní papír', amount: '10 rolí' },
    ],
  },
];

export const ListsViewPage = (): JSX.Element => {
  const [lists, setLists] = useState<ShoppingList[]>(initialLists);
  const [action, setAction] = useState<string>('listsView');

  console.log(lists);
  console.log(action);

  const deleteList = (index: number): void => {
    const newLists = [...lists];
    newLists.splice(index, 1);
    setLists(newLists);
  };

  const createList = () => {
    setAction('createList');
  };

  const addNewList = (newList: ShoppingList) => {
    setLists([...lists, newList]);
    setAction('listsView');
  };

  const editList = () => {
    setAction('editList');
  };

  const navigateToListsView = () => {
    setAction('listsView');
  };

  return (
    <>
      {action === 'createList' ? (
        <CreateList
          addNewList={addNewList}
          navigateToListsView={navigateToListsView}
        />
      ) : action === 'editList' ? (
        <EditList navigateToListsView={navigateToListsView} />
      ) : (
        <>
          <h2>Nákupní seznamy</h2>
          <button className="btn-create" onClick={createList}>
            + Vytvořit nový seznam
          </button>
          {lists.map((list, index) => {
            return (
              <div className="shopitem" key={index}>
                <div className="shopitem__name">{list.name}</div>
                <button className="btn-edit" onClick={editList}>
                  ✏️
                </button>
                <button
                  className="btn-delete"
                  onClick={() => deleteList(index)}
                >
                  Smazat
                </button>
              </div>
            );
          })}
        </>
      )}
    </>
  );
};
