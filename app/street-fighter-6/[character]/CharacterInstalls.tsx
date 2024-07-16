"use client";
import config from "@/app/street-fighter-6/config"
import type { Move } from "./MoveItem";
import "./styles/installs.css";

type Props = {
  character: string,
  installs: { data: Move[], key: string, }[],
  activeInstall: string,
  setActiveInstall: Function
}

export default function CharacterInstalls({ character, installs, activeInstall, setActiveInstall }: Props) {
  const sf6Config = config() as any;
  const installCharacter = sf6Config[character]?.installs;

  const handleOnChange = (e: any) => {
    setActiveInstall(e.target.value);
  }

  return (
    <div className="character-installs">
      <h4 className="section-header">States</h4>
      {/* <p className="header-subtext">Select a character&apos;s other states granted by buffs, supers, etc.</p> */}
      <ul>
        {installs.map(install => 
          <li 
            key={install.key} 
            className={install.key === activeInstall ? "active" : ""}
            onClick={() => setActiveInstall(install.key)}
          >
            <span className="button" data-install={installCharacter[install.key]}>{ installCharacter[install.key] }</span>
          </li>
        )}
      </ul>
      <select key={activeInstall} value={activeInstall} onChange={(e) => handleOnChange(e)}>
        {installs.map(install => 
          <option 
            key={install.key}
            value={install.key}
          >
            { installCharacter[install.key] }
          </option>
        )}
      </select>
    </div>
  )
}