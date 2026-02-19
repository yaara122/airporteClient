import classes from  './Card.module.css';

const Card: React.FC<{classNames?:string, children: React.ReactNode}> = props => {
    return (
    <div  className={`${classes.card} ${props.classNames}`}>
      {props.children}
    </div>
  );
}

export default Card