export default function Login({l}){
    return <div className="container">
    <div className="login">
        <h2>{l?'Регистрация':'Вход'}</h2>
        <div>
            <label htmlFor="login">Логин</label>
            <input type="text" id='login'placeholder="Логин"/>
        </div>
        <div>
            <label htmlFor="pass">Пароль</label>
            <input type="password" id='pass'placeholder="Пароль"/>
        </div>
       { !l&&<div>
            <label htmlFor="rpass">Повтор пароля</label>
            <input type="password" id='rpass' placeholder="Повтор пароля"/>
        </div>}
        <a>{l?'Регистрация':'Войти'}</a>
    </div>
    </div>
}