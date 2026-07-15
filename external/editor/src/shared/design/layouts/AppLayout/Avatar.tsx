import styles from "./Avatar.module.css"

export type AvatarProps = {
  initials: string
}

const Avatar: React.FC<AvatarProps> = ({ initials }) => {
  return <span className={styles.avatar}>{initials}</span>
}

export default Avatar
