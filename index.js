const input = document.querySelector("input");
const button = document.querySelector("button");
const result = document.querySelector(".result-area");

async function dictionaryFn(word) {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(res => res.json());
    return res[0];
}

button.addEventListener('click', fetchandCreateCard);

async function fetchandCreateCard() {
    const data = await dictionaryFn(input.value);

    console.log(data); 
    
    if (!data || !data.meanings || data.meanings.length === 0) {
        console.error('Meanings data is not defined or empty');
        result.innerHTML = `<div class="error">No results found for "${input.value}". Please try another word.</div>`;
        return;
    }

    let partOfSpeechArray = [];
    for (let i = 0; i < data.meanings.length; i++) {
        partOfSpeechArray.push(data.meanings[i].partOfSpeech);
    }

    result.innerHTML = `
     <div class="card">
        <div class="property">
            <span>Word:</span>
            <span>${data.word}</span>
        </div>
        <div class="property">
            <span>Phonetics:</span>
            <span>${data.phonetics.map(p => p.text).join(', ')}</span>
        </div>
        <div class="property">
            <span>
            <audio controls src="${data.phonetics[0] ? data.phonetics[0].audio : ''}"></audio>
            </span>
        </div>
        <div class="property">
            <span>Definition:</span>
            <span>${data.meanings[0].definitions[0].definition}</span>
        </div>
        <div class="property">
            <span>Example:</span>
            <span>${data.meanings[0].definitions[0].example || 'No example available'}</span>
        </div>
        <div class="property">
            <span>Parts of Speech:</span>
            <span>${partOfSpeechArray.join(', ')}</span>
        </div>
     </div>`;
}
