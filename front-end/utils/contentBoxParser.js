// Receives text including text content and optionally image in base64. Returns the image in base64 and the text content.
const cheerio = require('cheerio');

export const parseContent = (content) => {
    const $ = cheerio.load(content);
    const pTags = $('p');

    let imgBase64Array = [];
    let modifiedContent = '';

    pTags.each((index, pTag) => {
        const imgTags = $(pTag).find('img');

        imgTags.each((imgIndex, imgTag) => {
            const imgSrc = $(imgTag).attr('src');
            if (imgSrc) {
                imgBase64Array.push(`data:image/png;base64,${imgSrc.split(',')[1]}`);
                $(imgTag).remove();
            }
        });

        modifiedContent += `<p>${$(pTag).html()}</p>`;
    });

    return [imgBase64Array, modifiedContent];
};