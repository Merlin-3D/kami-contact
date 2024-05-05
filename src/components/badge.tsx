import classNames from "classnames";

export type BadgeType = "all" | "standard" | "premium" | "vip" | "vvip";

interface BadgeProps {
  type: BadgeType;
  isSelected?: boolean;
  name: string;
  onSelected?: () => void;
}

const badgeType = {
  standard: ["bg-yellow-600", "text-white"],
  premium: ["bg-other-20", "text-white"],
  vip: ["bg-green-600", "text-white"],
  vvip: ["bg-red-600", "text-white"],
  all: ["bg-other-70 border border-gray-200", "text-other-80"],
};

export function Badge({ type, isSelected, name, onSelected }: BadgeProps) {
  return (
    <div
      className={classNames(
        badgeType[type][0],
        { "border border-other-80": isSelected },
        "cursor-pointer rounded-full px-4 py-1 flex justify-center items-center"
      )}
      onClick={onSelected}
    >
      <span className={classNames(badgeType[type][1], "text-xs font-medium")}>
        {name}
      </span>
    </div>
  );
}
