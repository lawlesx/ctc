import styles from '../styles/content.module.css'

export interface contentProps {
  
}
 
const content: React.FC<contentProps> = () => {
  return ( 
    <div className={styles.container}>
      <h3>Holder</h3>
      <p>187</p>
    </div>
    
   );
}
 
export default content;