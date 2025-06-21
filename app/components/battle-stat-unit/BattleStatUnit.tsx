import type { IconType } from "react-icons";

interface BattleStatUnitType {
  title: string;
  value: string;
  iconComponent: IconType;
}

export function BattleStatUnit({
  title,
  value,
  iconComponent: Icon,
}: BattleStatUnitType) {
  return (
    <div className="stat-unit">
      <div className="stat-unit-icon">
        <Icon />
      </div>
      <div className="stat-unit-text">
        <div className="stat-unit-title">{title}</div>
        <div className="stat-unit-value">{value}</div>
      </div>
    </div>
  );
}
