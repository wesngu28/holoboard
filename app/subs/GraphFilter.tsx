import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";

interface Props {
  onChange: (newFilter: string) => void;
  onCheckBox: (newSet: Set<string>) => void
  setProp: Set<string>
}

export default function GraphFilter({ onChange, onCheckBox, setProp }: Props) {
  const checkboxIds = useMemo(() => ['Hololive EN', 'Holostars EN', 'Myth', 'CouncilRys', 'Tempus Wave 1', 'Tempus Wave 2'], []);
  const checkboxes = useRef<HTMLInputElement[]>([]);
  const [allChecked, setAllChecked] = useState(false);
  useEffect(() => {
    for (let i = 0; i < checkboxIds.length; i++) {
      checkboxes.current[i].checked = !checkboxes.current[i].checked;
    };

  }, [checkboxIds])
  function selectAll() {
    setAllChecked(!allChecked);
    const newSet = allChecked
      ? new Set(['Myth', 'CouncilRys', 'Tempus Wave 1', 'Tempus Wave 2'])
      : new Set([]);
    onCheckBox(newSet);
    for (let i = 0; i < checkboxIds.length; i++) {
      checkboxes.current[i].checked = !checkboxes.current[i].checked;
    };
  }

  function handleCheck(e: ChangeEvent<HTMLInputElement>) {
    let addable = new Set([e.target.id])
    if (e.target.id === 'Hololive EN') {
      addable = new Set(['Myth', 'CouncilRys'])
      checkboxes.current[2].checked = e.target.checked
      checkboxes.current[3].checked = e.target.checked
    }
    if (checkboxes.current[2].checked === checkboxes.current[3].checked) {
      checkboxes.current[0].checked = checkboxes.current[2].checked
    }
    if (e.target.id === 'Holostars EN') {
      addable = new Set(['Tempus Wave 1', 'Tempus Wave 2'])
      checkboxes.current[4].checked = e.target.checked
      checkboxes.current[5].checked = e.target.checked
    }
    checkboxes.current[0].checked = checkboxes.current[2].checked && checkboxes.current[3].checked;
    checkboxes.current[1].checked = checkboxes.current[4].checked && checkboxes.current[5].checked;
    if (e.target.checked) {
      onCheckBox(new Set([...setProp, ...addable]))
    } else {
      onCheckBox(new Set(Array.from(setProp).filter(filter => !addable.has(filter))))
    }
  }

  return (
    <>
      <div className="flex justify-between w-full">
        <button onClick={selectAll}>Select All !! :D</button>
        <select>
          <option onClick={() => onChange("subs")}>Subscribers</option>
          <option onClick={() => onChange("video_count")}>Videos</option>
          <option onClick={() => onChange("view_count")}>Views</option>
        </select>
      </div>
      <div className="flex gap-4 mt-4 flex-wrap">
        {checkboxIds.map((cb, i)=> {
          return(
            <div key={cb}>
              <input ref={el => checkboxes.current[i] = el!} type="checkbox" onChange={(e) => handleCheck(e)} id={cb} />
              <label className="mx-2" htmlFor={cb}>{cb}</label>
            </div>
          )
        })}
      </div>
    </>
  );
}
