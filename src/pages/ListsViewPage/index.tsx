import { useState } from 'react';
import { Link } from 'react-router-dom';

import { initialLists, ShoppingList } from '../../types';

import { CreateList } from '../../components/CreateList';
import { EditList } from '../../components/EditList';

export const ListsViewPage = (): JSX.Element => {
  const [lists, setLists] = useState<ShoppingList[]>(initialLists);
  const [action, setAction] = useState<string>('listsView');
  const [editingIndex, setEditingIndex] = useState<number>(0);

  const handleDeleteList = (index: number): void => {
    const newLists = [...lists];
    newLists.splice(index, 1);
    setLists(newLists);
  };

  const handleCreateList = (): void => {
    setAction('createList');
  };

  const handleEditList = (index: number): void => {
    setEditingIndex(index);
    setAction('editList');
  };

  const addNewList = (newList: ShoppingList): void => {
    setLists([...lists, newList]);
    setAction('listsView');
  };

  const updateList = (updatedList: ShoppingList, index: number): void => {
    lists[index] = updatedList;
    setAction('listsView');
  };

  const navigateToListsView = (): void => {
    setAction('listsView');
  };

  return (
    <>
      {action === 'createList' ? (
        <CreateList
          addNewList={addNewList}
          navigateToListsView={navigateToListsView}
          currentLists={lists}
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
                <div className="shopitem__name">
                  {list.id}. <Link to={`/${list.id}`}>{list.name}</Link>
                </div>
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
                  ❌
                </button>
              </div>
            );
          })}
        </>
      )}
    </>
  );
};
