import styles from './toggle.module.scss'

import cx from 'classnames'
import { useState } from 'react'
import { useRecoil } from 'hooks/state'
import { themeState } from 'states/system'
import { LightModeIcon, DarkModeIcon } from 'assets/svgs'

const Toggle = () => {
  const [theme, setTheme] = useRecoil(themeState)
  const [isToggleChecked, setIsToggleChecked] = useState(false)

  const handleChangeTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
      setIsToggleChecked(true)
    } else {
      setTheme('light')
      setIsToggleChecked(false)
    }
  }

  return (
    <div className={cx(styles.toggle)}>
      <div className={cx(styles.wrapper)}>
        <div className={cx(styles.toggleMove, { [styles.move]: isToggleChecked })} />
        <div className={cx(styles.buttons)}>
          <button
            className={cx(styles.button, { [styles.clicked]: !isToggleChecked })}
            type='button'
            onClick={handleChangeTheme}
          >
            <LightModeIcon className={cx(styles.icon, { [styles.clicked]: !isToggleChecked })} />
          </button>
          <button
            className={cx(styles.button, { [styles.clicked]: isToggleChecked })}
            type='button'
            onClick={handleChangeTheme}
          >
            <DarkModeIcon className={cx(styles.icon, { [styles.clicked]: isToggleChecked })} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Toggle
