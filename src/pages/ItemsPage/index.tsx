import { useParams, Link } from 'react-router-dom';
import { Fragment, useState, useEffect } from 'react';

import { initialLists, ListItem, ShoppingList } from '../../types';

export const ItemsPage = (): JSX.Element => {
  const { seznam } = useParams<{ seznam: string }>();

  // Vybrání konkrétního seznamu podle URL k vykreslení položek nákupu
  const chosenList: ShoppingList | undefined = initialLists.find(
    (list) => list.id === Number(seznam),
  );

  // Vybrání všech položek všech seznamů pro jejich zobrazení v našeptávači
  const allItems: ListItem[] = initialLists.reduce(
    (accumulator: ListItem[], currentList: ShoppingList) => {
      return accumulator.concat(currentList.items);
    },
    [],
  );

  // Stavy používané při přidání nové položky
  const [nameInput, setNameInput] = useState<string>('');
  const [amountInput, setAmountInput] = useState<string>('');
  const [itemsList, setItemsList] = useState<ListItem[]>(
    chosenList ? chosenList.items : [],
  );

  // Stavy používané při editaci jednotlivých položek
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editIndex, setEditIndex] = useState<number>(-1);
  const [originalNames, setOriginalNames] = useState<string[]>([]);
  const [originalAmounts, setOriginalAmounts] = useState<string[]>([]);

  // Stav pro drag & drop položek
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  // Uložení původních hodnot jednotlivých položek (důležité při předčasném ukončení editace položky)
  useEffect(() => {
    if (chosenList) {
      const names: string[] = chosenList.items.map((item) => item.name);
      const amounts: string[] = chosenList.items.map((item) => item.amount);
      setOriginalNames(names);
      setOriginalAmounts(amounts);
    }
  }, [chosenList]);

  // Funkce pro přidání/odebrání a odškrtnutí již existujících (vykreslených) položek
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
      if (chosenList) {
        chosenList.items.push(newItem);
      }
      setNameInput('');
      setAmountInput('');
    }
  };

  const deleteItem = (index: number): void => {
    const newList: ListItem[] = [...itemsList];
    newList.splice(index, 1);
    setItemsList(newList);
  };

  const toggleItemBought = (index: number): void => {
    const newList: ListItem[] = [...itemsList];
    newList[index].bought = !newList[index].bought;
    setItemsList(newList);
  };

  // Funkce pro kontrolu editace položky (zahájení, uložení a předčasné ukončení editace)
  const startEditing = (index: number): void => {
    if (isEditing && editIndex !== index) {
      itemsList[editIndex].name = originalNames[editIndex];
      itemsList[editIndex].amount = originalAmounts[editIndex];
      setEditIndex(index);
    } else {
      setIsEditing(!isEditing);
      setEditIndex(index);
    }
  };

  const finishEditing = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    newName: string,
  ): void => {
    event.preventDefault();

    let isDuplicate: boolean = false;

    if (chosenList !== undefined) {
      isDuplicate = chosenList?.items
        .filter((_, index) => index !== editIndex)
        .some((item) => {
          const normalizedNewName: string = newName
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');

          const normalizedItemName: string = item.name
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
          return normalizedItemName === normalizedNewName;
        });
    }

    if (isDuplicate) {
      alert(`${newName} se již v seznamu nachází`);
    } else if (newName !== '') {
      setIsEditing(false);
      setEditIndex(-1);
    }
  };

  const cancelEditing = (
    originalName: string,
    originalAmount: string,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    event.preventDefault();
    setIsEditing(false);
    setEditIndex(-1);
    updateItemName(editIndex, originalName);
    updateItemAmount(editIndex, originalAmount);
  };

  // Funkce pro aktualizaci hodnot upravované položky
  const updateItemName = (index: number, newName: string): void => {
    const updatedList: ListItem[] = [...itemsList];
    updatedList[index].name = newName;
    setItemsList(updatedList);
  };

  const updateItemAmount = (index: number, newAmount: string): void => {
    const updatedList: ListItem[] = [...itemsList];
    updatedList[index].amount = newAmount;
    setItemsList(updatedList);
  };

  // Funkce pro kontrolu drag & drop položek
  const handleDragStart = (index: number): void => {
    setDraggedIndex(index);
  };

  const handleDragOver = (index: number): void => {
    if (draggedIndex === null) return;
    const newItems: ListItem[] = [...itemsList];
    const draggedItem: ListItem = newItems[draggedIndex];
    newItems.splice(draggedIndex, 1);
    newItems.splice(index, 0, draggedItem);
    setItemsList(newItems);
    setDraggedIndex(index);
  };

  const handleDrop = (): void => {
    setDraggedIndex(null);
  };

  return (
    <>
      <p>
        <Link to="/" className="navigate">
          Nákupní seznamy
        </Link>{' '}
        &gt; Úprava položek seznamu
      </p>
      {
        // Formulář pro přidání nové položky do seznamu
      }
      <form className="newitem-form">
        <h2>{chosenList?.name}</h2>
        <h3>Co nakoupit:</h3>
        <label htmlFor="input-name">Položka</label>
        <input
          id="input-name"
          type="text"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          list="item-list"
        />
        <datalist id="item-list">
          {allItems.map((item, index) => (
            <option key={index} value={item.name} />
          ))}
        </datalist>
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
        {
          // Zobrazení všech položek nákupního seznamu
          itemsList.map((item, index) => {
            let tickClass: string = 'btn-tick';
            let boughtClass: string = '';

            if (item.bought) {
              tickClass += ' btn-tick--on';
              boughtClass = ' bought';
            }
            return (
              <Fragment key={index}>
                <div
                  className={`shopitem${boughtClass}`}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={() => handleDragOver(index)}
                  onDrop={handleDrop}
                >
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
                    ❌
                  </button>
                </div>
                {
                  // Podmíněně zobrazený formulář pro editaci existující položky
                  isEditing && editIndex === index && (
                    <div className="edititem-form">
                      <form>
                        <label htmlFor="input-name">Položka</label>
                        <input
                          id="input-name"
                          type="text"
                          value={item.name}
                          onChange={(e) =>
                            updateItemName(index, e.target.value)
                          }
                        />
                        <label htmlFor="input-amount">Množství</label>
                        <input
                          id="input-amount"
                          type="text"
                          value={item.amount}
                          onChange={(e) =>
                            updateItemAmount(index, e.target.value)
                          }
                        />
                        <button
                          className="btn-add"
                          onClick={(e) => finishEditing(e, item.name)}
                        >
                          Upravit
                        </button>
                        <button
                          className="btn-add"
                          onClick={(e) =>
                            cancelEditing(
                              originalNames[index],
                              originalAmounts[index],
                              e,
                            )
                          }
                        >
                          Zrušit
                        </button>
                      </form>
                    </div>
                  )
                }
              </Fragment>
            );
          })
        }
      </div>
    </>
  );
};
