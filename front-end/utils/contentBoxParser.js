// Receives text including text content and optionally image in base64. Returns the image in base64 and the text content.
export const parseContent = (content) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const pTags = doc.querySelectorAll('p');

    let imgBase64 = "data:image/png;base64,";
    let modifiedContent = '';
    let foundImage = false;

    pTags.forEach((pTag) => {
        const imgTag = pTag.querySelector('img');

        if (imgTag) {
            imgBase64 += imgTag.src.split(',')[1];
            foundImage = true;
            pTag.removeChild(imgTag);
        }

        modifiedContent += `<p>${pTag.innerHTML}</p>`;
    });

    if (!foundImage) {
        imgBase64 = null;
    }
    console.log(imgBase64);
    return [imgBase64, modifiedContent];
};