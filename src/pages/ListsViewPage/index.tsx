import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CreateList } from '../../components/CreateList';
import { ShoppingList } from '../../types';
import { EditList } from '../../components/EditList';

const initialLists: ShoppingList[] = [
  {
    name: 'Velikonoční nákup',
    items: [
      { name: 'Vajíčka', amount: '10 ks', bought: true },
      { name: 'Mouka', amount: '1 kg', bought: false },
    ],
  },
  {
    name: 'Nákup na chatu',
    items: [
      { name: 'Pivo', amount: '6 ks', bought: false },
      { name: 'Grilovací maso', amount: '2 kg', bought: false },
    ],
  },
  {
    name: 'Drogerie',
    items: [
      { name: 'Šampon', amount: '1 ks', bought: true },
      { name: 'Toaletní papír', amount: '10 rolí', bought: true },
    ],
  },
];

export const ListsViewPage = (): JSX.Element => {
  const [lists, setLists] = useState<ShoppingList[]>(initialLists);
  const [action, setAction] = useState<string>('listsView');
  const [editingIndex, setEditingIndex] = useState<number>(0);

  console.log(lists);
  console.log(action);

  const handleDeleteList = (index: number): void => {
    const newLists = [...lists];
    newLists.splice(index, 1);
    setLists(newLists);
  };

  const handleCreateList = () => {
    setAction('createList');
  };

  const handleEditList = (index: number): void => {
    setEditingIndex(index);
    setAction('editList');
  };

  const addNewList = (newList: ShoppingList) => {
    setLists([...lists, newList]);
    setAction('listsView');
  };

  const updateList = (updatedList: ShoppingList, index: number) => {
    lists[index] = updatedList;
    setAction('listsView');
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
        <EditList
          list={lists[editingIndex]}
          updateList={updateList}
          navigateToListsView={navigateToListsView}
          index={editingIndex}
        />
      ) : (
        <>
          <h2>Nákupní seznamy</h2>
          <button className="btn-create" onClick={handleCreateList}>
            + Vytvořit nový seznam
          </button>
          {lists.map((list, index) => {
            return (
              <div className="shopitem" key={index}>
                <Link to={`/${encodeURIComponent(list.name)}`}>
                  <div className="shopitem__name">{list.name}</div>
                </Link>
                <button
                  className="btn-edit"
                  onClick={() => handleEditList(index)}
                >
                  ✏️
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDeleteList(index)}
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
