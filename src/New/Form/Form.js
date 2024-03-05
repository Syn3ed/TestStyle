import React, { useCallback, useState } from 'react';
import "./Form.css";
// import Skrepka from './component/skrepka';
export const Form = () => {
    const [address, setAddress] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [suggestedAddresses, setSuggestedAddresses] = useState([]);
    const [isSwitchOn, setIsSwitchOn] = useState(false); // Новое состояние для свитча
    const tg = window.Telegram.WebApp;

    const onSendData = useCallback(() => {
        const data = {
            address,
            category,
            description,
            isSwitchOn
        };
        tg.sendData(JSON.stringify(data));
        console.log('Отправка данных:', JSON.stringify(data));
    }, [address, category, description, isSwitchOn, tg]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Адрес:', address);
        console.log('Категория:', category);
        console.log('Описание:', description);
        console.log('Свитч:', isSwitchOn);
    };
    const autoResizeTextarea = (e) => {
        const textarea = e.target;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
    };
    const suggestedAddressesList = [
        "692500, Приморский край, г. Уссурийск. Лимичёвская улица, 20",
        "673730, Забайкальский край, Могочинский р-н, Могоча г, Складская ул, дом № 3",
        "692500, Приморский край, Дальнереченск г Железнодорожная улица, 8",
        "673410, Забайкальский край, Нерчинский р-н, Приисковый пгт, Проточная ул, дом № 1",
        "678080, Саха /Якутия/ Респ, Мегино-Кангаласский у, Нижний Бестях п, Ленина ул, дом № 139",
        "674313, Забайкальский край, Приаргунский р-н, Досатуй п, Строительная ул, дом № 1",
        "677004, Саха /Якутия/ Респ, Якутск г, 50 лет Советской Армии ул, дом № 45",
        "673200, Забайкальский край, Хилокский р-н, Хилок г, Ямаровская ул, дом № 49",
        "678960, Саха /Якутия/ Респ, Нерюнгри г, Разрезовская ул, дом № 5",
        "673460, Забайкальский край, Чернышевский р-н, Чернышевск пгт, Железнодорожная ул, дом № 187",
        "692343, Приморский край, Находка г, Шоссейная ул, дом № 134",
        "673370, Забайкальский край, Шилкинский р-н, Шилка г, Станционная ул, дом № 5",
        "Россия, Приморский край, Владивостокский г.о., Трудовое п, Лермонтова ул, д.5",
        "676244, Амурская обл, Зея г, Магистральная ул З/У 28:03:020003:516",
        "687420, Забайкальский край, Могойтуйский р-н, Могойтуй пгт, Железнодорожная ул, дом № 1",
        "676770, Амурская обл, Райчихинск г, Зеленая ул, дом № 1 В",
        "674500, Забайкальский край, Оловяннинский р-н, Оловянная пгт, Южная ул",
        "675000, Амурская обл, Тында г, Привокзальная ул, дом № 11",
        "674601, Забайкальский край, Борзинский р-н, Борзя г, Совхозная ул, дом 5Б",
        "676150, Амурская обл, Магдагачинский р-н, Тыгда с, ТЕР/КВ-Л Перевалочная база/Квартал 71",
        "Забайкальский край, пгт.Забайкальск, ул.Гаражная, уч.1",
        "679013, Еврейская Аобл, Биробиджан г, Комбайностроителей ул, дом № 38",
        "Забайкальский край, г.Краснокаменск, 2,5 км. На Север от центра г.Краснокаменск",
        "672014, Забайкальский край, Чита г, Недорезова ул, дом № 1А",
        "Забайкальский край, г.Краснокаменск, тер.Автодорога №9, 17",
        "672026, Забайкальский край, Чита г, Кадала п, Охранный туп, дом № 4",
        "Забайкальский край, г.Нерчинск, ул.Погодаева, 183А",
        "672530, Забайкальский край, Читинский р-н, Атамановка пгт, Рабочая ул, дом № 95",
        "Забайкальский край, г. Чита, ул. Олимпийская, 1",
        "680032, Хабаровский край, Хабаровск г, Зеленая ул, дом № 2Б",
        "Забайкальский край, г. Чита, ул. Олимпийская, 2а",
        "680015, Хабаровский край, Хабаровск г, Суворова ул, дом № 82А 84 к2",
        "Забайкальский край, г.Петровск-Забайкальский, район Пески",
        "682429, Хабаровский край, Ульчский р-н, Де-Кастри п, Соколинская ул, дом № 3А",
        "Забайкальский край, Чернышеквский район, пгт.Чернышевск, ул.Линия, 1А",
        "680032, Хабаровский край, Хабаровск г, Зеленая ул, дом № 2Б",
        "Забайкальский край, Оловяннинский район, п/ст Ясная, ул.Станционная, 13А",
        "681005, Хабаровский край, Комсомольск-на-Амуре г, Павловского ул, дом № 27А",
        "676740, Амурская обл, Архаринский р-н, Архара пгт, Залинейная ул, дом № 22",
        "675504, Амурская обл, Благовещенский р-н, Волково с, З/У 28:10:002003:649",
        "676700, Амурская обл, Бурейский р-н, Бурея пгт, Амурская ул, дом № 25",
        "680032, Хабаровский край, Хабаровск г, Зеленая ул, дом № 2Б",
        "676460, Амурская обл, Свободный г, Деповская ул, дом № 4",
        "682860, Хабаровский край, Ванинский р-н, Ванино рп, Железнодорожная ул, дом 117",
        "676870, Амурская обл, Завитинский р-н, Завитинск г, Мухинская ул, дом № 1",
        "676011, Амурская обл, Сковородинский р-н, Сковородино г, З/У ориен. Красноармейская ул, дом № 73",
        "676630, Амурская обл, Октябрьский р-н, Екатеринославка с, Пионерская ул, дом № 33",
        "676150, Амурская обл, Магдагачинский р-н, Тыгда с, Станционная ул, дом № 27",
        "676307, Амурская обл, Шимановск г, Плеханова ул, дом № 14",
        "676856, Амурская обл, Белогорск г, 9 Мая ул, дом № 210",
        "676863, Амурская обл, Белогорск г, Металлургическая ул, дом № 1",
        "679013, Еврейская Аобл, Биробиджан г, Советская ул, дом 121А",
        "675028, Амурская обл, Благовещенск г, Студенческая ул, дом № 17",
        "Хабаровский край, Верхнебуреинский район, рабочий поселок Чегдомын, ул. Магистральная, д. 13",
        "682910, Хабаровский край, Имени Лазо р-н, Переяславка рп, Ленина ул, дом № 1",
        "681005, Хабаровский край, Комсомольск-на-Амуре г, Павловского ул, дом 27А",
        "673310, Забайкальский край, Карымский р-н, Дарасун пгт, 1-я Золотовская ул, дом № 1А",
        "682817, Хабаровский край, Советская Гавань г, Вокзальная ул, дом 1",
        "674601, Забайкальский край, Борзинский р-н, Борзя г, Соловьевская ул, дом № 1",
        "692245, Приморский край, Спасск-Дальний г. 3-я Загородная ул. дом 14/1",
        "673310, Забайкальский край, Карымский р-н, Дарасун пгт, 1-я Золотовская ул, дом № 1А",
        "Саха /Якутия/ Респ, Якутск г., Покровское шоссе, 6 км, 2/1",
        "687420, Забайкальский край, Могойтуйский р-н, Могойтуй пгт, Железнодорожная ул, дом № 1",
        "Владивосток, Приморский край, улица Проходная 4-я, 31"
    ];

    const handleAddressSelection = (selectedAddress) => {
        setAddress(selectedAddress);
        setSuggestedAddresses([]);
    };
    const isFormValid = address.trim() !== '' && category.trim() !== '' && description.trim() !== '';
    return (
        <div className="form">
            <div className='greeting'>Здравствуйте!👋<br /> Чем мы можем вам помочь?<br />
            <br /></div>
            <div className='form-filling' onSubmit={handleSubmit}>

                <div className='adres'>
                    <br />
                    {address && <label className='lable-filling2'>Aдрес ПЗУ</label>}
                    <textarea
                        id="address"
                        className='textIn'
                        placeholder="Введите адрес ПЗУ"
                        value={address}
                        // onChange={(e) => setAddress(e.target.value)}
                        onInput={autoResizeTextarea}
                        autocomplete="off"
                        onChange={(e) => {
                            const value = e.target.value;
                            setAddress(value);
                            setSuggestedAddresses(
                                value.trim() !== ''
                                    ? suggestedAddressesList.filter(addr =>
                                        addr.toLowerCase().includes(value.toLowerCase())
                                    )
                                    : []
                            );
                        }}
                        required
                    />
                    {Boolean(suggestedAddresses.length) && (
                        <ul className="suggested-addresses">
                            {suggestedAddresses.map((suggestedAddress, index) => (
                                <li key={index} onClick={() => handleAddressSelection(suggestedAddress)}>
                                    {suggestedAddress}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className='theme'>
                    <br />
                    {category && <label className='lable-filling2'>Тема таявки</label>}
                    <textarea
                        id="theme"
                        className='textIn'
                        placeholder="Введите тему заявки"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        onInput={autoResizeTextarea}
                        autocomplete="off"
                    />
                </div>
                {/* <div className='category'>
                    <br />
                    {category && <label className='lable-filling'>Введите категорию заявки</label>}
                    <textarea
                        id="category"
                        className='textIn'
                        placeholder="Введите категорию заявки"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        onInput={autoResizeTextarea}
                        autocomplete="off"
                    />
                </div> */}
                <div className='description'>
                    <br />
                    {description && <label className='lable-filling2'>Описание заявки</label>}
                    <textarea
                        id="description"
                        className='textIn'
                        placeholder="Введите описание заявки"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        onInput={autoResizeTextarea}
                        autocomplete="off"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="switch">Прикрепить к заявке файлы</label>
                    <label className="switch">
                        <input
                            type="checkbox"
                            id="switch"
                            checked={isSwitchOn}
                            onChange={() => setIsSwitchOn(!isSwitchOn)}
                        />
                        <span className="slider round"></span>
                    </label>
                </div>
                {isFormValid && (
                <div className='button-send' onClick={onSendData}>
                    {/* <div className='Skrepka'><Skrepka/></div> */}
                    <div>Отправить заявку</div>
                </div>)}
            </div>
        </div>
    );
};

export default Form;
