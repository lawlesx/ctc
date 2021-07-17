import styles from '../styles/modal.module.css';
import { motion } from 'framer-motion';

export interface ModalProps {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  data: any;
  setCoin : React.Dispatch<React.SetStateAction<string>>;
}

const backdrop = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 1
    }
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
      delayChildren: 0.3
    }
  }
}

const inner = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.7,
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: {
    opacity: 0,
    y: -10
  },
  visible: {
    opacity: 1,
    y:0,
    transition: {
      duration: 0.7
    }
  }
}

const crossVariants = {
  visible: {
    rotate: 45
  },
  hover: {
    rotate: 90
  }
}


const Modal: React.FC<ModalProps> = ({setModal , data , setCoin}) => {

  if (data==undefined)
  {
    return (
      <div>Loading</div>
    )
  }
  else {
    
    return ( 
      <motion.div variants={backdrop} initial='hidden' animate='visible' exit='hidden' className={styles.container}>
        <motion.div variants={backdrop} className={styles.modal}>
          <motion.div variants={inner} className={styles.inner}>
            {
              Object.keys(data).map((item: string) => (
                <motion.p variants={itemVariants} key={item} onClick={() => {
                  setCoin(item);
                  setModal(false);
                }}>{item}</motion.p>
              ))
            }
          </motion.div>
          
  
          <motion.div variants={crossVariants} animate='visible' whileHover='hover' className={styles.cross} onClick={()=>setModal(false)}>
            <div className={styles.line1}></div>
            <div className={styles.line2}></div>
          </motion.div>
        </motion.div>
      </motion.div>
     );
  }

  
}
 
export default Modal;