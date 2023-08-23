import home from '../assets/home.png'
import leave from '../assets/leave.png'
import ava from '../assets/def_ava.png'
export default function Profile(){
    return <div className="container_p">
        <div className="header_p">
            <img src={home} alt="" />
        </div>
        <div className='body_p'>
            <div className='leave'>
                <img src={leave} alt="" />
            </div>
            <div className='info'>
                <img src={ava} alt="" />
                <div>
                    <p>имя фамилия</p>
                    <p>никнейм</p>
                </div>
            </div>
            <div className='cont'>
                <div>
                    <label htmlFor="name">Имя</label>
                    <input type="text" id='name'placeholder="Имя"/>
                </div>
                <div>
                    <label htmlFor="male">Пол</label>
                    <select name="" id="male">
                        <option value="def">Пол</option>
                        <option value="male">Муж</option>
                        <option value="female">Жен</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="sernmae">Фамилия</label>
                    <input type="text" id='sername'placeholder="Фамилия"/>
                </div>
                <div>
                    <label htmlFor="tel">Телефон</label>
                    <input type="tel" id='tel'placeholder="Телефон"/>
                </div>
                <div>
                    <label htmlFor="nick">Ник</label>
                    <input type="text" id='nick'placeholder="Ник"/>
                </div>
                <div>
                    <label htmlFor="date">Дата рождения</label>
                    <input type="date" id='date' />
                </div>
            </div>
            
            <a>Сохранить</a>
        </div>
    </div>
}