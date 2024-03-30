import { initialLists } from '../../types';
import { useParams } from 'react-router';
import { Fragment, useState, useEffect } from 'react';
import { ListItem, ShoppingList } from '../../types';
import { Link } from 'react-router-dom';

export const ItemsPage = (): JSX.Element => {
  const { seznam } = useParams();

  const chosenList: ShoppingList | undefined = initialLists.find(
    (list) => list.id === Number(seznam),
  );

  const [nameInput, setNameInput] = useState<string>('');
  const [amountInput, setAmountInput] = useState<string>('');
  const [itemsList, setItemsList] = useState<ListItem[]>(
    chosenList ? chosenList.items : [],
  );
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editIndex, setEditIndex] = useState<number>(-1);
  const [originalNames, setOriginalNames] = useState<string[]>([]);
  const [originalAmounts, setOriginalAmounts] = useState<string[]>([]);

  useEffect(() => {
    // Při změně seznamu nastavit nové původní hodnoty
    if (chosenList) {
      const names = chosenList.items.map((item) => item.name);
      const amounts = chosenList.items.map((item) => item.amount);
      setOriginalNames(names);
      setOriginalAmounts(amounts);
    }
  }, [chosenList]);

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

  const updateItemName = (index: number, newName: string): void => {
    const updatedList = [...itemsList];
    updatedList[index].name = newName;
    setItemsList(updatedList);
  };

  const updateItemAmount = (index: number, newAmount: string): void => {
    const updatedList = [...itemsList];
    updatedList[index].amount = newAmount;
    setItemsList(updatedList);
  };

  const startEditing = (index: number) => {
    setIsEditing(!isEditing);
    setEditIndex(index);
  };

  const finishEditing = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    event.preventDefault();
    setIsEditing(false);
    setEditIndex(-1);
  };

  const cancelEditing = (
    originalName: string,
    originalAmount: string,
  ): void => {
    // event.preventDefault();
    setIsEditing(false);
    setEditIndex(-1);
    updateItemName(editIndex, originalName);
    updateItemAmount(editIndex, originalAmount);
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
            <Fragment key={index}>
              <div className="shopitem">
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
                <div className="edititem-form">
                  <form>
                    <label htmlFor="input-name">Položka</label>
                    <input
                      id="input-name"
                      type="text"
                      value={item.name}
                      onChange={(e) => updateItemName(index, e.target.value)}
                    />
                    <label htmlFor="input-amount">Množství</label>
                    <input
                      id="input-amount"
                      type="text"
                      value={item.amount}
                      onChange={(e) => updateItemAmount(index, e.target.value)}
                    />
                    <button className="btn-add" onClick={finishEditing}>
                      Upravit
                    </button>
                  </form>
                  <button
                    className="btn-add"
                    onClick={() =>
                      cancelEditing(
                        originalNames[index],
                        originalAmounts[index],
                      )
                    }
                  >
                    Zrušit
                  </button>
                </div>
              )}
            </Fragment>
          );
        })}
      </div>
    </>
  );
};
