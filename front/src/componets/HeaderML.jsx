import grid from '../assets/grid.png'
import pencil from '../assets/pencil.png'
import '../styles/css/sass.css'
export default function HeaderML(){
    return <div className='header hml'>
        <div className='grid'>
            <img src={grid} alt="" />
        </div>
        <div className='list'>
            <select>
                <option value="def">списки чатов</option>
            </select>
        </div>
        <div className='pencil'>
            <img src={pencil} alt="" />
        </div>
    </div>
}