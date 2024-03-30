import { initialLists } from '../../types';
import { useParams } from 'react-router';
import { useState } from 'react';
import { ListItem, ShoppingList } from '../../types';
import { Link } from 'react-router-dom';

export const ItemsPage = (): JSX.Element => {
  const { seznam } = useParams();
  console.log(seznam);

  const chosenList: ShoppingList | undefined = initialLists.find(
    (list) => list.id === Number(seznam),
  );

  console.log(chosenList);
  const [nameInput, setNameInput] = useState<string>('');
  const [amountInput, setAmountInput] = useState<string>('');
  const [itemsList, setItemsList] = useState<ListItem[]>(
    chosenList ? chosenList.items : [],
  );
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editIndex, setEditIndex] = useState<number>(-1);

  const addItem = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    event.preventDefault();
    const newItem: ListItem = {
      name: nameInput,
      amount: amountInput,
      bought: false,
    };

    let isDuplicate: boolean = false;

    if (chosenList !== undefined) {
      isDuplicate = chosenList?.items.some((item) => {
        const normalizedInputName: string = nameInput
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');

        const normalizedItemName: string = item.name
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');
        return normalizedItemName === normalizedInputName;
      });
    }

    if (isDuplicate) {
      alert(`${nameInput} se již v seznamu nachází`);
    } else if (nameInput !== '') {
      setItemsList([...itemsList, newItem]);
      setNameInput('');
      setAmountInput('');
      console.log(itemsList);
    }
  };

  const deleteItem = (index: number) => {
    const newList = [...itemsList];
    newList.splice(index, 1);
    setItemsList(newList);
  };

  const toggleItemBought = (index: number) => {
    const newList = [...itemsList];
    newList[index].bought = !newList[index].bought;
    setItemsList(newList);
  };

  const startEditing = (index: number) => {
    setIsEditing(!isEditing);
    setEditIndex(index);
  };

  const finishEditing = () => {
    setIsEditing(false);
    setEditIndex(-1);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setEditIndex(-1);
  };

  return (
    <>
      <p>
        <Link to="/" className="navigate">
          Nákupní seznamy
        </Link>{' '}
        &gt; Úprava položek seznamu
      </p>
      <form className="newitem-form">
        <h2>{chosenList?.name}</h2>
        <h3>Co nakoupit:</h3>
        <label htmlFor="input-name">Položka</label>
        <input
          id="input-name"
          type="text"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />
        <label htmlFor="input-amount">Množství</label>
        <input
          id="input-amount"
          type="text"
          value={amountInput}
          onChange={(e) => setAmountInput(e.target.value)}
        />
        <button className="btn-add" onClick={addItem}>
          Přidat
        </button>
      </form>
      <div className="shoplist">
        {itemsList.map((item, index) => {
          let tickClass = 'btn-tick';

          if (item.bought) {
            tickClass += ' btn-tick--on';
          }
          return (
            <>
              <div className="shopitem" key={index}>
                <button
                  className={`${tickClass} shopitem__tick`}
                  onClick={() => toggleItemBought(index)}
                ></button>
                <div className="shopitem__name">{item.name}</div>
                <div className="shopitem__amount">{item.amount}</div>
                <button
                  className="btn-edit"
                  onClick={() => startEditing(index)}
                >
                  ✏️
                </button>
                <button
                  className="btn-delete"
                  onClick={() => deleteItem(index)}
                >
                  Smazat
                </button>
              </div>
              {isEditing && editIndex === index && (
                <form className="edititem-form">
                  <label htmlFor="input-name">Položka</label>
                  <input
                    id="input-name"
                    type="text"
                    value={item.name}
                    onChange={(e) => setNameInput(e.target.value)}
                  />
                  <label htmlFor="input-amount">Množství</label>
                  <input
                    id="input-amount"
                    type="text"
                    value={item.amount}
                    onChange={(e) => setAmountInput(e.target.value)}
                  />
                  <button className="btn-add" onClick={finishEditing}>
                    Upravit
                  </button>
                  <button className="btn-add" onClick={cancelEditing}>
                    Zrušit
                  </button>
                </form>
              )}
            </>
          );
        })}
      </div>
    </>
  );
};
