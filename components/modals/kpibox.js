import styles from './kpibox.module.scss'; // Import the scoped styles

const Kpibox = ({ children, title = "", righttitle = "", withhead = true , theme="dark", padding="0px"}) => {
    return (<div style={{padding: padding}} className={styles["kpi-box-"+theme] }>
        <div className={styles["kpiBox"]}>
            {withhead &&
                <div className={styles["box-header"]}>
                    <div className={styles['box']}>
                        <h3>{title}</h3>
                        <span>{righttitle}</span>
                    </div>
                </div>
            }
            <div className='body'>
                {children}
            </div>
        </div>
    </div>
    )
}
export default Kpibox;