import React, { useCallback, useState } from 'react';
import './Style.css';

const RequestForm = () => {
    const [address, setAddress] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');

    const tg = window.Telegram.WebApp;

    const onSendData = useCallback(() => {
        const data = {
            address,
            category,
            description
        };
        tg.sendData(JSON.stringify(data));
        console.log(JSON.stringify(data));
    }, [address, category, description, tg]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Address:', address);
        console.log('Category:', category);
        console.log('Description:', description);
    };

    // Проверка, все ли поля формы заполнены
    const isFormValid = address.trim() !== '' && category.trim() !== '' && description.trim() !== '';

    return (
        <div className="request-description-form">
            <h2>Форма заполнения заявки</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="address">Адрес ПЗУ:</label>
                    <input
                        type="text"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="category">Категория:</label>
                    <input
                        type="text"
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Описание:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div> 
                <button type="submit" onClick={onSendData} disabled={!isFormValid}>
                    Отправить заявку
                </button>
            </form>
        </div>
    );
};

export default RequestForm;
