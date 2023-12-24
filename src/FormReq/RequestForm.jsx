import React, { useCallback, useState } from 'react';
import Autosuggest from 'react-autosuggest';
import './Style.css';

const RequestForm = () => {
    const [address, setAddress] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [suggestedAddresses, setSuggestedAddresses] = useState([]);

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

    const isFormValid = address.trim() !== '' && category.trim() !== '' && description.trim() !== '';

    const suggestedAddressesList = [
        "Улица Первая, дом 1",
        "Проспект Главный, дом 10",
        "Переулок Тихий, дом 5",
        "Бульвар Центральный, дом 20",
        "Площадь Солнечная, дом 3",
        // ... добавьте другие адреса, если необходимо
    ];

    const getSuggestions = (value) => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0 ? [] : suggestedAddressesList.filter(address =>
            address.toLowerCase().includes(inputValue)
        );
    };

    const renderSuggestion = (suggestion) => (
        <div>
            {suggestion}
        </div>
    );

    const handleAddressChange = (event, { newValue }) => {
        setAddress(newValue);
        setSuggestedAddresses(getSuggestions(newValue));
    };

    const handleAddressSelection = (selectedAddress) => {
        setAddress(selectedAddress);
        setSuggestedAddresses([]);
    };

    return (
        <div className="request-description-form">
            <h2>Форма заполнения заявки</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="address">Адрес ПЗУ:</label>
                    <Autosuggest
                        suggestions={suggestedAddresses}
                        onSuggestionsFetchRequested={({ value }) => setSuggestedAddresses(getSuggestions(value))}
                        onSuggestionsClearRequested={() => setSuggestedAddresses([])}
                        getSuggestionValue={(suggestion) => suggestion}
                        renderSuggestion={renderSuggestion}
                        inputProps={{
                            id: 'address',
                            value: address,
                            onChange: handleAddressChange,
                            required: true
                        }}
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

                {isFormValid && (
                    <button type="submit" onClick={onSendData}>
                        Отправить заявку
                    </button>
                )}
            </form>
        </div>
    );
};

export default RequestForm;
