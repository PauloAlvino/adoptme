import styles from './Image.module.css';
import React from 'react'

const Image = ({src, alt, width}) => {
  return (
    <img src={src} alt={alt} className={`${styles.image} ${styles[width]}`}/>
  )
}

export default Image