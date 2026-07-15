import cx from "classnames"

import styles from "./ItemList.module.css"
import { type Item } from "./ItemList.types.ts"

export type ItemListProps = {
  items: Item[]
  active?: string
  onSelect?: (id: string) => void
} & Omit<React.HTMLAttributes<HTMLUListElement>, "onSelect">

const ItemList: React.FC<ItemListProps> = ({
  items,
  active,
  onSelect,
  className,
  ...props
}) => {
  return (
    <ul {...props} className={cx(styles.list, className)}>
      {items.map((item) => (
        <li key={item.id}>
          <button
            type="button"
            className={cx(styles.item, { [styles.active]: item.id === active })}
            onClick={() => onSelect?.(item.id)}
          >
            <span className={styles.marker} aria-hidden="true" />
            <span className={styles.name}>{item.name}</span>
            {item.badge && <span className={styles.badge}>{item.badge}</span>}
          </button>
        </li>
      ))}
    </ul>
  )
}

export default ItemList
