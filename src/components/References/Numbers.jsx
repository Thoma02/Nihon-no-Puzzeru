import React from 'react';

const NumbersReference = () => {
    const referenceData = [
        { kanji: '一', hiragana: 'いち', romaji: 'ichi', translation: 'one' },
        { kanji: '二', hiragana: 'に', romaji: 'ni', translation: 'two' },
        { kanji: '三', hiragana: 'さん', romaji: 'san', translation: 'three' },
        { kanji: '四', hiragana: 'し', romaji: 'shi', translation: 'four' },
        { kanji: '五', hiragana: 'ご', romaji: 'go', translation: 'five' },
        { kanji: '六', hiragana: 'ろく', romaji: 'roku', translation: 'six' },
        { kanji: '七', hiragana: 'しち', romaji: 'shichi', translation: 'seven' },
        { kanji: '八', hiragana: 'はち', romaji: 'hachi', translation: 'eight' },
        { kanji: '九', hiragana: 'きゅう', romaji: 'kyuu', translation: 'nine' },
    ];

    return (
        <div className="reference">
            <table>
                <thead>
                    <tr>
                        <th>Kanji</th>
                        <th>Hiragana</th>
                        <th>Romaji</th>
                        <th>Translation</th>
                    </tr>
                </thead>
                <tbody>
                    {referenceData.map((item, index) => (
                        <tr key={index}>
                            <td>{item.kanji}</td>
                            <td>{item.hiragana}</td>
                            <td>{item.romaji}</td>
                            <td>{item.translation}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default NumbersReference;
