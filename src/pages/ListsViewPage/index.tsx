import { useState } from 'react';
// import { Link } from 'react-router-dom';
import { CreateList } from '../../components/createList';

interface ListItem {
  name: string;
  amount: string;
}

interface ShoppingList {
  name: string;
  items: ListItem[];
}

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

  const deleteList = (index: number): void => {
    const newLists = [...lists];
    newLists.splice(index, 1);
    setLists(newLists);
  };

  console.log(lists);
  console.log(action);

  const createList = () => {
    setAction('createList');
  };

  const editList = () => {
    setAction('editList');
  };

  return (
    <>
      {action === 'createList' ? (
        <CreateList />
      ) : action === 'editList' ? (
        <p>Tato komponenta upravuje stávající seznam.</p>
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
