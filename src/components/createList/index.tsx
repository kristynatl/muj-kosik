import { useState } from 'react';

export const CreateList = (): JSX.Element => {
  const [name, setName] = useState<string>('');

  const handleCreateList = (): void => {
    const newList = name.trim();
    if (newList) {
      console.log(newList);
    }
  };

  return (
    <>
      <p>
        <span className="navigate">Nákupní seznamy</span> &gt; Vytvoření nového
        seznamu
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
