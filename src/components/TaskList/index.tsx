import styles from './styles.module.scss'
import { AiOutlineDelete } from 'react-icons/ai'
import { useEffect, useState } from 'react'

interface ITaskItem {
    id: number,
    title: string,
    isComplete: boolean
}
 
export function TaskList() {
    const [ newTask, setNewTask ] = useState('')
    const [ tasks, setTasks ] = useState<ITaskItem[]>([])
    
    useEffect(() => {
        const dataStorage = localStorage.getItem('tasks')
        
        if ( dataStorage ){
            const tasksStorage = JSON.parse( dataStorage )
            setTasks(tasksStorage)
        }
    }, [])
    
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }, [tasks])

    const handleCreateNewTask = ( e: any ) => {
        e.preventDefault() 
        const taskFormated = {
            id: Date.parse(String(new Date())),
            title: newTask,
            isComplete: false
        }

        setTasks([...tasks, taskFormated])
        console.log([taskFormated, ...tasks])
    }

    const handleToggleTaskCompletion = (id: Number) => {
        const tasksParsed = tasks.map( task => {
            if (task.id === id) {
                task.isComplete = !task.isComplete
            }

            console.log()

            return task
        })

        setTasks([...tasksParsed])
    }

    const handleDeleteTask = (id: Number) => {
        const tasksParsed = tasks.filter( task => task.id !== id)
        setTasks([...tasksParsed])
    }
    
    return (
        <section className={styles.taskListContainer}>
            <header className={styles.taskListContainer__header}>
                <h1>Minhas Task</h1>
                <form onSubmit={handleCreateNewTask}>
                    <input 
                        type="text" 
                        placeholder="Adicione uma task" 
                        onChange={({target}: any) => setNewTask(target.value)}
                        value={newTask}
                    />
                    <button
                        onClick={handleCreateNewTask}
                    >
                        Adicionar
                    </button>
                </form>
            </header>
            <main>
                <ul>
                    {
                        tasks && tasks.map( (task: ITaskItem) => {
                        return (
                            <li key={task.id} className={task.isComplete ? `${styles.taskItem} ${styles.complete}` : styles.taskItem}>
                                <input 
                                    type="checkbox"
                                    readOnly
                                    checked={task.isComplete}
                                    onChange={ () => handleToggleTaskCompletion(task.id) }
                                    
                                />
                                {task.title}
                                <button onClick={() => handleDeleteTask(task.id)}>
                                    <AiOutlineDelete />
                                </button>
                            </li>
                        )})
                    }
                </ul>
            </main>
        </section>
    )
}
